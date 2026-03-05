// Obsidian Plugin: Assets Empty Folder Cleaner
// Plain JS — no build step required

const {
  Plugin,
  Notice,
  TFile,
  TFolder,
  Modal,
  Setting,
  PluginSettingTab,
} = require("obsidian");

const DEFAULT_SETTINGS = {
  basePath: "Assets",                    // Only operate under this folder
  excludeRules: [".obsidian", ".trash"], // Strings with optional * wildcard, or JS regex between /.../
  maxListInModal: 200,                   // Cap list length shown in modal to avoid huge UIs
};

// ---------- utils ----------
function parseExcludeRules(rawRules) {
  const arr = Array.isArray(rawRules)
    ? rawRules
    : String(rawRules || "")
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
  return arr.map((s) => {
    if (s.startsWith("/") && s.endsWith("/") && s.length > 2) {
      try { return new RegExp(s.slice(1, -1)); } catch { return s; }
    }
    return s;
  });
}
function wildcardToReg(s) {
  const esc = s.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  return new RegExp("^" + esc.replace(/\*/g, ".*") + "$");
}
function makeExcluder(rules) {
  const compiled = rules.map((r) => (r instanceof RegExp ? r : String(r)));
  return (path) =>
    compiled.some((pat) => {
      if (pat instanceof RegExp) return pat.test(path);
      if (typeof pat === "string") {
        if (pat.includes("*")) return wildcardToReg(pat).test(path);
        return path === pat || path.startsWith(pat + "/");
      }
      return false;
    });
}

// ---------- modal (custom buttons layout) ----------
class ListModal extends Modal {
  constructor(app, { title, lines, max = 200, cta, onCta, secondaryCta, onSecondary }) {
    super(app);
    this._title = title;
    this._lines = Array.isArray(lines) ? lines : [];
    this._max = max;
    this._cta = cta;               // e.g. "Delete"
    this._onCta = onCta;
    this._secondaryCta = secondaryCta; // e.g. "Cancel" or "Copy list"
    this._onSecondary = onSecondary;
  }

  onOpen() {
    const { contentEl, modalEl } = this;
    modalEl.addClass("aefc-modal");
    contentEl.empty();
    contentEl.createEl("h2", { text: this._title });

    const info = contentEl.createEl("div", { cls: "aefc-info" });
    const total = this._lines.length;
    info.setText(total === 0 ? "No items." : `${total} item(s) shown below:`);

    if (total > 0) {
      const ul = contentEl.createEl("ul", { cls: "aefc-list" });
      const cap = Math.min(total, this._max);
      for (let i = 0; i < cap; i++) ul.createEl("li", { text: this._lines[i] });
      if (total > cap) ul.createEl("li", { text: `...and ${total - cap} more` });
    }

    // 按钮容器：水平靠右布局；顺序为 [Delete] [Cancel]（或其他 secondary）
    const btns = contentEl.createEl("div", { cls: "aefc-btns" });
    btns.style.display = "flex";
    btns.style.justifyContent = "flex-end";
    btns.style.gap = "0.5rem";
    btns.style.marginTop = "1rem";

    // Delete（主按钮）在左
    if (this._cta) {
      const delBtn = btns.createEl("button", { text: this._cta });
      delBtn.addClass("mod-cta");
      delBtn.onclick = () => { try { this._onCta?.(); } finally { this.close(); } };
    }

    // Cancel（或其他副按钮）在右
    if (this._secondaryCta) {
      const secBtn = btns.createEl("button", { text: this._secondaryCta });
      secBtn.onclick = () => { try { this._onSecondary?.(); } finally { this.close(); } };
    }
  }
}

// ---------- plugin ----------
module.exports = class AssetsEmptyFolderCleaner extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new CleanerSettingTab(this.app, this));

    // Ribbon button: Delete only (icon = folder-minus, tooltip = Delete Empty Folder)
    const deleteRibbon = this.addRibbonIcon(
      "folder-minus",
      "Delete Empty Folder",
      async () => {
        const { basePath, excludeRules, maxListInModal } = this.settings;
        const targets = await this.scan(basePath, excludeRules);
        const lines = targets.map((f) => f.path);
        new ListModal(this.app, {
          title: `Delete ${lines.length} empty folder(s) under ${basePath}/?`,
          lines,
          max: maxListInModal,
          secondaryCta: "Cancel",  // 按钮靠右，Delete 在左，Cancel 在右
          onSecondary: () => {},
          cta: lines.length ? "Delete" : undefined,
          onCta: async () => {
            let ok = 0, failed = [];
            for (const f of targets) {
              try { await this.app.vault.delete(f, true); ok++; }
              catch (e) { failed.push([f.path, String(e)]); }
            }
            new Notice(`Deleted ${ok} folder(s)` + (failed.length ? `, failed ${failed.length}` : ""));
            if (failed.length) console.error("AEFC delete failed:", failed);
          },
        }).open();
      }
    );
    deleteRibbon.addClass("aefc-ribbon");

    // Commands (Preview available via Command Palette; no preview ribbon)
    this.addCommand({
      id: "aefc-preview",
      name: "Preview empty folders under base folder",
      callback: async () => {
        const { basePath, excludeRules, maxListInModal } = this.settings;
        const res = await this.scan(basePath, excludeRules);
        const lines = res.map((f) => f.path);
        new ListModal(this.app, {
          title: `Preview: ${lines.length} empty folder(s) under ${basePath}/`,
          lines,
          max: maxListInModal,
          // 只有一个副按钮（比如 Copy list），也会靠右
          secondaryCta: "Copy list",
          onSecondary: async () => {
            const text = lines.join("\n");
            try {
              await navigator?.clipboard?.writeText(text);
              new Notice("Copied list to clipboard.");
            } catch {
              console.warn("Clipboard write failed; printing to console instead.");
              console.log(text);
              new Notice("Failed to copy. Printed list to console.");
            }
          },
        }).open();
      },
    });

    this.addCommand({
      id: "aefc-delete",
      name: "Delete empty folders under base folder (with confirm)",
      callback: async () => {
        const { basePath, excludeRules, maxListInModal } = this.settings;
        const targets = await this.scan(basePath, excludeRules);
        const lines = targets.map((f) => f.path);
        new ListModal(this.app, {
          title: `Delete ${lines.length} empty folder(s) under ${basePath}/?`,
          lines,
          max: maxListInModal,
          secondaryCta: "Cancel",
          onSecondary: () => {},
          cta: lines.length ? "Delete" : undefined,
          onCta: async () => {
            let ok = 0, failed = [];
            for (const f of targets) {
              try { await this.app.vault.delete(f, true); ok++; }
              catch (e) { failed.push([f.path, String(e)]); }
            }
            new Notice(`Deleted ${ok} folder(s)` + (failed.length ? `, failed ${failed.length}` : ""));
            if (failed.length) console.error("AEFC delete failed:", failed);
          },
        }).open();
      },
    });

    const status = this.addStatusBarItem();
    status.setText("AEFC ready");

    console.log("Assets Empty Folder Cleaner loaded.");
  }

  onunload() {
    console.log("Assets Empty Folder Cleaner unloaded.");
  }

  async saveSettings() { await this.saveData(this.settings); }

  // Core: scan for empty folders under basePath with exclude rules
  async scan(basePath, rawExclude) {
    const rules = parseExcludeRules(rawExclude);
    const isExcluded = makeExcluder(rules);

    const base = this.app.vault.getAbstractFileByPath(basePath);
    if (!(base instanceof TFolder)) {
      new Notice(`Base folder not found: ${basePath}`);
      return [];
    }

    // Gather all descendant folders (exclude base itself)
    const all = [];
    const stack = [base];
    while (stack.length) {
      const cur = stack.pop();
      for (const ch of cur.children) {
        if (ch instanceof TFolder) { all.push(ch); stack.push(ch); }
      }
    }

    // Sort deepest-first so parents only become candidates after children are considered
    all.sort((a, b) => b.path.split("/").length - a.path.split("/").length);

    const hasAnyFile = (folder) => {
      const s = [folder];
      while (s.length) {
        const f = s.pop();
        for (const ch of f.children) {
          if (ch instanceof TFile) return true;         // any file below makes it non-empty
          if (ch instanceof TFolder) {
            if (isExcluded(ch.path)) return true;       // treat excluded folder as non-empty barrier
            s.push(ch);
          }
        }
      }
      return false;
    };

    const toDelete = [];
    for (const f of all) {
      if (isExcluded(f.path)) continue;
      if (!hasAnyFile(f)) toDelete.push(f);
    }

    return toDelete;
  }
};

class CleanerSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Assets Empty Folder Cleaner" });

    new Setting(containerEl)
      .setName("Base folder")
      .setDesc("Only scan & delete under this folder (relative to vault root). Example: Assets")
      .addText((t) =>
        t.setPlaceholder("Assets")
         .setValue(this.plugin.settings.basePath)
         .onChange(async (v) => {
           this.plugin.settings.basePath = v.trim() || "Assets";
           await this.plugin.saveSettings();
         })
      );

    new Setting(containerEl)
      .setName("Exclude rules")
      .setDesc("One per line. Either literal path prefix (supports * wildcard) or regex like /Assets\\/NoteAssets_.*/")
      .addTextArea((ta) =>
        ta.setPlaceholder(".obsidian\n.trash\nAssets/NoteAssets_*\n/Assets\\/Excalidraw.*Assets/")
          .setValue(
            Array.isArray(this.plugin.settings.excludeRules)
              ? this.plugin.settings.excludeRules.join("\n")
              : String(this.plugin.settings.excludeRules || "")
          )
          .onChange(async (v) => {
            this.plugin.settings.excludeRules = v;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Preview list cap")
      .setDesc("Max number of paths shown in the confirmation/preview modal")
      .addText((t) =>
        t.setPlaceholder(String(DEFAULT_SETTINGS.maxListInModal))
         .setValue(String(this.plugin.settings.maxListInModal))
         .onChange(async (v) => {
           const n = Number(v);
           this.plugin.settings.maxListInModal =
             Number.isFinite(n) && n > 0 ? n : DEFAULT_SETTINGS.maxListInModal;
           await this.plugin.saveSettings();
         })
      );

    containerEl.createEl("div", {
      cls: "setting-item-description",
      text: "Ribbon shows a Folder-Minus (delete) button with tooltip: 'Delete Empty Folder'. Preview is available via Command Palette.",
    });
  }
}
