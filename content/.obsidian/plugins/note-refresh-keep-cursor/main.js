"use strict";

const { Plugin, MarkdownView, Notice } = require("obsidian");

class NoteRefreshKeepCursorPlugin extends Plugin {
  onload() {
    this.addCommand({
      id: "refresh-current-note-keep-cursor",
      name: "Refresh Current Note",
      checkCallback: (checking) => {
        const view = this.getActiveMarkdownView();
        if (!view) {
          return false;
        }
        if (!checking) {
          this.refreshCurrentNote(view);
        }
        return true;
      }
    });

    this.addRibbonIcon(
      "refresh-cw",
      "Refresh Current Note",
      () => this.refreshCurrentNote()
    );
  }

  getActiveMarkdownView() {
    return this.app.workspace.getActiveViewOfType(MarkdownView) ?? null;
  }

  getLeafFromView(view) {
    return view?.leaf ?? this.app.workspace.getMostRecentLeaf() ?? null;
  }

  getMarkdownViewFromLeaf(leaf) {
    const candidate = leaf?.view ?? null;
    return candidate instanceof MarkdownView ? candidate : null;
  }

  getPreviewElement(view) {
    if (!view || !view.containerEl) {
      return null;
    }
    return (
      view.containerEl.querySelector(".markdown-reading-view") ||
      view.containerEl.querySelector(".markdown-preview-view") ||
      view.containerEl.querySelector(".markdown-rendered")
    );
  }

  cloneSelections(selections) {
    if (!Array.isArray(selections)) {
      return null;
    }
    return selections.map((sel) => ({
      anchor: sel.anchor ? { line: sel.anchor.line, ch: sel.anchor.ch } : null,
      head: sel.head ? { line: sel.head.line, ch: sel.head.ch } : null
    }));
  }

  captureState(view) {
    const editor = view?.editor ?? null;
    let editorState = null;

    if (editor) {
      const cursor = typeof editor.getCursor === "function" ? editor.getCursor() : null;
      const scrollInfo =
        typeof editor.getScrollInfo === "function" ? editor.getScrollInfo() : null;
      const selections =
        typeof editor.listSelections === "function" ? editor.listSelections() : null;

      editorState = {
        cursor: cursor ? { line: cursor.line, ch: cursor.ch } : null,
        selections: this.cloneSelections(selections),
        scrollTop: scrollInfo?.top ?? null,
        scrollLeft: scrollInfo?.left ?? null
      };
    }

    const previewEl = this.getPreviewElement(view);
    const previewState = previewEl
      ? {
          scrollTop: previewEl.scrollTop,
          scrollLeft: previewEl.scrollLeft
        }
      : null;

    return {
      mode: typeof view?.getMode === "function" ? view.getMode() : null,
      editor: editorState,
      preview: previewState
    };
  }

  restoreState(view, state) {
    if (!view || !state) {
      return;
    }

    const restore = () => {
      const editor = view.editor;
      if (editor && state.editor) {
        if (
          state.editor.selections &&
          typeof editor.setSelections === "function"
        ) {
          editor.setSelections(state.editor.selections);
        } else if (state.editor.cursor && typeof editor.setCursor === "function") {
          editor.setCursor(state.editor.cursor);
        }

        if (
          state.editor.scrollTop != null &&
          typeof editor.scrollTo === "function"
        ) {
          editor.scrollTo(state.editor.scrollLeft ?? 0, state.editor.scrollTop);
        } else if (
          state.editor.cursor &&
          typeof editor.scrollIntoView === "function"
        ) {
          editor.scrollIntoView(
            { from: state.editor.cursor, to: state.editor.cursor },
            true
          );
        }

        if (typeof editor.focus === "function") {
          editor.focus();
        }
      }

      const previewEl = this.getPreviewElement(view);
      if (previewEl && state.preview) {
        previewEl.scrollTop = state.preview.scrollTop;
        previewEl.scrollLeft = state.preview.scrollLeft;
      }
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(restore);
    });
  }

  async refreshCurrentNote(view = null) {
    const activeView = view ?? this.getActiveMarkdownView();
    if (!activeView) {
      new Notice("No active markdown note to refresh.");
      return;
    }

    const leaf = this.getLeafFromView(activeView);
    const snapshot = this.captureState(activeView);
    try {
      await this.refreshView(activeView, leaf);

      const restoredView =
        this.getMarkdownViewFromLeaf(leaf) ??
        this.getActiveMarkdownView() ??
        activeView;

      this.restoreState(restoredView, snapshot);
    } catch (error) {
      console.error("Note Refresh Keep Cursor: refresh failed", error);
      new Notice("Refresh failed. Open console for details.");
    }
  }

  async runRefresh(target, method, ...args) {
    if (!target || typeof target[method] !== "function") {
      return false;
    }
    try {
      const result = target[method](...args);
      if (result && typeof result.then === "function") {
        await result;
      }
      return true;
    } catch (error) {
      console.warn(
        `Note Refresh Keep Cursor: ${method} failed on target`,
        error
      );
      return false;
    }
  }

  async refreshView(view) {
    const leaf = this.getLeafFromView(view);

    // Most reliable refresh path for the current note view.
    if (await this.runRefresh(leaf, "rebuildView")) {
      return;
    }

    // Fallback: reset current view state to itself (soft rebuild).
    if (
      leaf &&
      typeof leaf.getViewState === "function" &&
      typeof leaf.setViewState === "function"
    ) {
      try {
        const state = leaf.getViewState();
        if (state) {
          const result = leaf.setViewState(state, false);
          if (result && typeof result.then === "function") {
            await result;
          }
          return;
        }
      } catch (error) {
        console.warn("Note Refresh Keep Cursor: setViewState refresh failed", error);
      }
    }

    const refreshed =
      (await this.runRefresh(view?.currentMode, "rerender", true)) ||
      (await this.runRefresh(view?.previewMode, "rerender", true)) ||
      (await this.runRefresh(view, "rerender", true)) ||
      (await this.runRefresh(view?.editor, "refresh"));

    if (refreshed) {
      return;
    }

    // CM6 fallback: request a fresh layout measurement.
    if (view?.editor?.cm && typeof view.editor.cm.requestMeasure === "function") {
      view.editor.cm.requestMeasure();
      return;
    }

    // Last resort: ask workspace to refresh markdown preview/layout.
    this.app.workspace.trigger("markdown-preview-refresh");
    this.app.workspace.trigger("layout-change");
  }
}

module.exports = NoteRefreshKeepCursorPlugin;
