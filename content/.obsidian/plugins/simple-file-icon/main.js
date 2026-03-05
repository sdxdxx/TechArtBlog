const { Plugin, PluginSettingTab, Setting, Modal, Notice } = require("obsidian");

// ==================== 1. 核心配置数据 ====================
const DEFAULT_SETTINGS = {
    enableFolderIcons: true,
    enableFileIcons: true,
    // 样式微调参数
    iconGap: 1,
    iconVerticalOffset: 0,

    folderIcons: [
        { path: "0_收集箱", emoji: "🗑️" },
        { path: "1_项目", emoji: "📁" },
        { path: "2_领域", emoji: "🧭" },
        { path: "3_资源", emoji: "📚" },
        { path: "4_归档", emoji: "📦" }
    ],
    fileTypeIcons: [
        { name: "文本文件", extensions: [".txt", ".ini"], emoji: "📄" },
        { name: "Markdown", extensions: [".md"], emoji: "📝" },
        { name: "图片", extensions: [".png", ".jpg", ".jpeg", ".gif", ".webp"], emoji: "🖼️" },
        { name: "PDF", extensions: [".pdf"], emoji: "📋" },
        { name: "Word", extensions: [".docx", ".doc"], emoji: "📑" },
        { name: "Excel", extensions: [".xlsx", ".xls", ".csv"], emoji: "📈" },
        { name: "PPT", extensions: [".ppt", ".pptx"], emoji: "📊" },
        { name: "视频", extensions: [".mp4", ".mov", ".avi", ".mkv"], emoji: "🎥" },
        { name: "音频", extensions: [".mp3", ".wav", ".flac"], emoji: "🎵" },
        { name: "压缩包", extensions: [".zip", ".rar", ".7z"], emoji: "🗜️" },
        { name: "代码", extensions: [".js", ".css", ".html", ".py", ".java", ".c", ".cpp", ".json"], emoji: "💻" },
        { name: "Canvas", extensions: [".canvas"], emoji: "🎨" }
    ]
};

// ==================== 2. 强制注入的设置面板 CSS ====================
const SETTINGS_CSS = `
    /* 设置面板列表容器 */
    .sfi-list {
        display: flex;
        flex-direction: column;
        gap: 12px; 
        padding: 4px 0;
    }

    /* 卡片样式 */
    .sfi-card {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background-color: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
        border-radius: 8px;
        transition: all 0.2s ease;
    }

    /* 修复：针对调节面板的特殊布局 */
    .sfi-adjust-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        gap: 20px; /* 两个滑块区域之间的间距 */
        background-color: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .sfi-card:hover, .sfi-adjust-card:hover {
        border-color: var(--interactive-accent);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        background-color: var(--background-primary);
    }

    /* 调节项单独容器 */
    .sfi-setting-item {
        flex: 1;
        padding: 0 !important;
        border: none !important;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .sfi-setting-item .setting-item-info {
        margin-bottom: 8px;
        margin-right: 0 !important;
        width: 100%;
    }

    .sfi-setting-item .setting-item-control {
        width: 100%;
        justify-content: flex-start;
    }
    
    .sfi-setting-item input[type="range"] {
        width: 100%;
    }

    /* 左侧图标 */
    .sfi-card-icon {
        font-size: 24px;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--background-primary);
        border: 1px solid var(--background-modifier-border);
        border-radius: 6px;
        margin-right: 16px;
        flex-shrink: 0;
        line-height: 1;
    }

    /* 中间文字 */
    .sfi-card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        overflow: hidden;
    }

    .sfi-card-title {
        font-weight: 600;
        font-size: 15px;
        color: var(--text-normal);
        line-height: 1.2;
    }

    .sfi-card-subtitle {
        font-size: 12px;
        color: var(--text-muted);
        font-family: var(--font-monospace);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* 右侧按钮 */
    .sfi-card-btns {
        display: flex;
        gap: 8px;
        margin-left: 16px;
        flex-shrink: 0;
    }

    .sfi-btn {
        padding: 4px 12px;
        height: 30px;
        font-size: 13px;
        border-radius: 5px;
        cursor: pointer;
        background-color: var(--interactive-normal);
        border: 1px solid var(--background-modifier-border);
        color: var(--text-normal);
        transition: all 0.15s;
    }

    .sfi-btn:hover {
        background-color: var(--interactive-hover);
        border-color: var(--background-modifier-border-hover);
    }

    .sfi-btn.is-danger:hover {
        background-color: var(--background-modifier-error);
        color: var(--text-on-accent);
        border-color: var(--background-modifier-error);
    }
    
    .sfi-header-bar {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--background-modifier-border);
    }
`;

// ==================== 3. 插件主逻辑 ====================
class SimpleFileIconsPlugin extends Plugin {
    async onload() {
        await this.loadSettings();
        this.injectSettingsStyles();
        this.applyIconRules();
        this.addSettingTab(new SimpleFileIconsSettingTab(this.app, this));
    }

    onunload() {
        const settingsStyle = document.getElementById("sfi-settings-styles");
        if (settingsStyle) settingsStyle.remove();
        const iconStyle = document.getElementById("sfi-icon-rules");
        if (iconStyle) iconStyle.remove();
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.applyIconRules();
    }

    injectSettingsStyles() {
        const id = "sfi-settings-styles";
        let style = document.getElementById(id);
        if (!style) {
            style = document.createElement("style");
            style.id = id;
            document.head.appendChild(style);
        }
        style.textContent = SETTINGS_CSS;
    }

    applyIconRules() {
        const id = "sfi-icon-rules";
        let style = document.getElementById(id);
        if (!style) {
            style = document.createElement("style");
            style.id = id;
            document.head.appendChild(style);
        }

        let css = "";
        const gap = this.settings.iconGap;
        const offset = this.settings.iconVerticalOffset;

        const commonProps = `
            display: inline-block;
            margin-right: ${gap}px !important;
            font-style: normal;
            line-height: 1;
            position: relative;
            vertical-align: baseline; 
            transform: translateY(${offset}px); 
        `;

        if (this.settings.enableFolderIcons) {
            this.settings.folderIcons.forEach(icon => {
                const safePath = icon.path.replace(/"/g, '\\"');
                css += `
                .nav-folder-title[data-path^="${safePath}"] > .tree-item-inner::before {
                    content: "${icon.emoji}";
                    ${commonProps}
                }
                `;
            });
        }

        if (this.settings.enableFileIcons) {
            this.settings.fileTypeIcons.forEach(icon => {
                const selectors = icon.extensions.map(ext =>
                    `div[data-path$='${ext}'] .nav-file-title-content::before`
                ).join(",\n");
                if (selectors) {
                    css += `/* ${icon.name} */ ${selectors} { content: '${icon.emoji}'; ${commonProps} }`;
                }
            });
        }

        style.textContent = css;
    }
}

// ==================== 4. 设置面板 UI ====================
class SimpleFileIconsSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl("h2", { text: "Simple File Icons 设置" });

        // ----- 全局微调 (重构布局) -----
        this.renderHeader(containerEl, "🎨 全局样式微调");

        // 使用 Flexbox 容器，分为左右两栏
        const adjustCard = containerEl.createDiv({ cls: "sfi-adjust-card" });

        // 左侧：间距调节
        const leftCol = adjustCard.createDiv({ cls: "sfi-setting-item" });
        new Setting(leftCol)
            .setName("图标与文字间距")
            .setDesc("文件名左侧的空白距离 (px)")
            .addSlider(slider => slider
                .setLimits(0, 15, 1)
                .setValue(this.plugin.settings.iconGap)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.iconGap = value;
                    await this.plugin.saveSettings();
                }));

        // 右侧：垂直偏移
        const rightCol = adjustCard.createDiv({ cls: "sfi-setting-item" });
        new Setting(rightCol)
            .setName("垂直位置偏移")
            .setDesc("微调对齐：负数向上，正数向下 (px)")
            .addSlider(slider => slider
                .setLimits(-5, 5, 1)
                .setValue(this.plugin.settings.iconVerticalOffset)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.iconVerticalOffset = value;
                    await this.plugin.saveSettings();
                }));

        // ----- 文件夹设置 -----
        this.renderHeader(containerEl, "📁 文件夹图标");
        new Setting(containerEl)
            .setName("启用文件夹图标")
            .addToggle(t => t.setValue(this.plugin.settings.enableFolderIcons).onChange(async v => {
                this.plugin.settings.enableFolderIcons = v; await this.plugin.saveSettings(); this.display();
            }));

        if (this.plugin.settings.enableFolderIcons) {
            const actionBar = containerEl.createDiv({ cls: "sfi-header-bar" });
            const addBtn = actionBar.createEl("button", { text: "+ 添加文件夹规则", cls: "sfi-btn" });
            addBtn.style.backgroundColor = "var(--interactive-accent)";
            addBtn.style.color = "var(--text-on-accent)";
            addBtn.onclick = () => {
                new FolderIconModal(this.app, this.plugin, async (p, e) => {
                    this.plugin.settings.folderIcons.push({ path: p, emoji: e });
                    await this.plugin.saveSettings();
                    this.display();
                }).open();
            };

            const list = containerEl.createDiv({ cls: "sfi-list" });
            this.plugin.settings.folderIcons.forEach((icon, index) => {
                const card = list.createDiv({ cls: "sfi-card" });
                card.createDiv({ cls: "sfi-card-icon", text: icon.emoji });
                const info = card.createDiv({ cls: "sfi-card-content" });
                info.createDiv({ cls: "sfi-card-title", text: icon.path });
                info.createDiv({ cls: "sfi-card-subtitle", text: "文件夹路径" });
                const btns = card.createDiv({ cls: "sfi-card-btns" });
                const editBtn = btns.createEl("button", { text: "编辑", cls: "sfi-btn" });
                editBtn.onclick = () => {
                    new FolderIconModal(this.app, this.plugin, async (np, ne) => {
                        this.plugin.settings.folderIcons[index] = { path: np, emoji: ne };
                        await this.plugin.saveSettings();
                        this.display();
                    }, icon).open();
                };
                const delBtn = btns.createEl("button", { text: "删除", cls: "sfi-btn is-danger" });
                delBtn.onclick = async () => {
                    this.plugin.settings.folderIcons.splice(index, 1);
                    await this.plugin.saveSettings();
                    this.display();
                };
            });
        }

        // ----- 文件类型设置 -----
        containerEl.createEl("hr");
        this.renderHeader(containerEl, "📄 文件类型图标");
        new Setting(containerEl)
            .setName("启用文件类型图标")
            .addToggle(t => t.setValue(this.plugin.settings.enableFileIcons).onChange(async v => {
                this.plugin.settings.enableFileIcons = v; await this.plugin.saveSettings(); this.display();
            }));

        if (this.plugin.settings.enableFileIcons) {
            const actionBar = containerEl.createDiv({ cls: "sfi-header-bar" });
            const addBtn = actionBar.createEl("button", { text: "+ 添加文件类型", cls: "sfi-btn" });
            addBtn.style.backgroundColor = "var(--interactive-accent)";
            addBtn.style.color = "var(--text-on-accent)";
            addBtn.onclick = () => {
                new FileTypeIconModal(this.app, this.plugin, async (n, e, em) => {
                    this.plugin.settings.fileTypeIcons.push({ name: n, extensions: e, emoji: em });
                    await this.plugin.saveSettings();
                    this.display();
                }).open();
            };

            const list = containerEl.createDiv({ cls: "sfi-list" });
            this.plugin.settings.fileTypeIcons.forEach((icon, index) => {
                const card = list.createDiv({ cls: "sfi-card" });
                card.createDiv({ cls: "sfi-card-icon", text: icon.emoji });
                const info = card.createDiv({ cls: "sfi-card-content" });
                info.createDiv({ cls: "sfi-card-title", text: icon.name });
                info.createDiv({ cls: "sfi-card-subtitle", text: `扩展名: ${icon.extensions.join(", ")}` });
                const btns = card.createDiv({ cls: "sfi-card-btns" });
                const editBtn = btns.createEl("button", { text: "编辑", cls: "sfi-btn" });
                editBtn.onclick = () => {
                    new FileTypeIconModal(this.app, this.plugin, async (n, e, em) => {
                        this.plugin.settings.fileTypeIcons[index] = { name: n, extensions: e, emoji: em };
                        await this.plugin.saveSettings();
                        this.display();
                    }, icon).open();
                };
                const delBtn = btns.createEl("button", { text: "删除", cls: "sfi-btn is-danger" });
                delBtn.onclick = async () => {
                    this.plugin.settings.fileTypeIcons.splice(index, 1);
                    await this.plugin.saveSettings();
                    this.display();
                };
            });
        }
    }

    renderHeader(el, text) {
        const h3 = el.createEl("h3", { text });
        h3.style.marginTop = "20px";
        h3.style.marginBottom = "10px";
    }
}

// ==================== 5. 弹窗组件 ====================
class FolderIconModal extends Modal {
    constructor(app, plugin, onSubmit, curr = null) { super(app); this.plugin = plugin; this.onSubmit = onSubmit; this.path = curr?.path || ""; this.emoji = curr?.emoji || ""; this.isEdit = !!curr; }
    onOpen() {
        const { contentEl } = this; contentEl.empty(); contentEl.createEl("h2", { text: this.isEdit ? "编辑文件夹" : "添加文件夹" });
        new Setting(contentEl).setName("文件夹名称/路径").setDesc("如: 0_Inbox").addText(t => t.setValue(this.path).onChange(v => this.path = v));
        new Setting(contentEl).setName("图标 (Emoji)").addText(t => t.setValue(this.emoji).onChange(v => this.emoji = v));
        new Setting(contentEl).addButton(b => b.setButtonText("保存").setCta().onClick(() => { if (this.path && this.emoji) { this.onSubmit(this.path, this.emoji); this.close() } else { new Notice("请填写完整") } }));
    }
    onClose() { this.contentEl.empty(); }
}

class FileTypeIconModal extends Modal {
    constructor(app, plugin, onSubmit, curr = null) { super(app); this.plugin = plugin; this.onSubmit = onSubmit; this.name = curr?.name || ""; this.extensions = curr?.extensions.join(",") || ""; this.emoji = curr?.emoji || ""; this.isEdit = !!curr; }
    onOpen() {
        const { contentEl } = this; contentEl.empty(); contentEl.createEl("h2", { text: this.isEdit ? "编辑文件类型" : "添加文件类型" });
        new Setting(contentEl).setName("名称").setDesc("如: 图片").addText(t => t.setValue(this.name).onChange(v => this.name = v));
        new Setting(contentEl).setName("后缀名 (逗号分隔)").addText(t => t.setValue(this.extensions).onChange(v => this.extensions = v));
        new Setting(contentEl).setName("图标 (Emoji)").addText(t => t.setValue(this.emoji).onChange(v => this.emoji = v));
        new Setting(contentEl).addButton(b => b.setButtonText("保存").setCta().onClick(() => { if (this.name && this.extensions && this.emoji) { this.onSubmit(this.name, this.extensions.split(/[,，]/).map(s => s.trim()).filter(s => s), this.emoji); this.close() } else { new Notice("请填写完整") } }));
    }
    onClose() { this.contentEl.empty(); }
}

module.exports = SimpleFileIconsPlugin;