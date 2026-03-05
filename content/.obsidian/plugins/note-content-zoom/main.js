const { Plugin, PluginSettingTab, Setting, Notice } = require('obsidian');

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const MIN = 0.5;
const MAX = 3.0;

const DEFAULT_SETTINGS = {
    step: 0.10,            // 每次缩放幅度（Ctrl/⌘ + 滚轮）
    resetOnStartup: false, // 启动时还原到 100%
    showRibbonReset: true, // 左侧功能区一键还原按钮
    showStatus: true,      // 状态栏指示器（可点击还原）
    anchorToMouse: true,   // 滚轮缩放围绕鼠标位置
    keepFocus: true        // 缩放后滚动补偿，保持焦点不跳
};

module.exports = class NoteContentZoomPlugin extends Plugin {
    async onload() {
        const data = (await this.loadData()) ?? {};
        this.settings = Object.assign({}, DEFAULT_SETTINGS, data.settings || {});
        const savedZoom = typeof data.zoom === 'number' ? data.zoom : 1.0;
        this.zoom = this.settings.resetOnStartup ? 1.0 : clamp(savedZoom, MIN, MAX);

        this.injectStyle();
        document.documentElement.style.setProperty('--note-zoom', String(this.zoom));

        // Ctrl/Cmd + 滚轮
        this._onWheel = (ev) => {
            if (!(ev.ctrlKey || ev.metaKey)) return;

            const ctx = this.getScrollContext(ev);
            if (!ctx) return;

            ev.preventDefault();
            ev.stopPropagation();

            const step = Number(this.settings.step) || DEFAULT_SETTINGS.step;
            const dir = ev.deltaY < 0 ? 1 : -1;
            const oldZoom = this.zoom;
            const newZoom = clamp(oldZoom + dir * step, MIN, MAX);
            if (newZoom === oldZoom) return;

            if (this.settings.anchorToMouse || this.settings.keepFocus) {
                this.adjustScrollForZoom(ctx, oldZoom, newZoom, ev);
            }
            this.setZoom(newZoom, { toast: false });
        };
        this.app.workspace.containerEl.addEventListener('wheel', this._onWheel, { passive: false });

        // 命令
        this.addCommand({
            id: 'note-zoom-in',
            name: '放大笔记内容（内容缩放）',
            callback: () => this.setZoom(clamp(this.zoom + (this.settings.step || DEFAULT_SETTINGS.step), MIN, MAX))
        });
        this.addCommand({
            id: 'note-zoom-out',
            name: '缩小笔记内容（内容缩放）',
            callback: () => this.setZoom(clamp(this.zoom - (this.settings.step || DEFAULT_SETTINGS.step), MIN, MAX))
        });
        this.addCommand({
            id: 'note-zoom-reset',
            name: '重置笔记内容到 100%',
            callback: () => this.setZoom(1.0)
        });

        // UI：功能区按钮 & 状态栏
        this.updateRibbon();
        this.updateStatus();

        // 设置面板
        this.addSettingTab(new NoteZoomSettingTab(this.app, this));

        // 若启用“启动还原”，把 1.0 写回存储，确保下次也从 100% 开始
        if (this.settings.resetOnStartup && savedZoom !== 1.0) {
            await this.saveState();
        }
    }

    onunload() {
        this.app.workspace.containerEl.removeEventListener('wheel', this._onWheel, { passive: false });
        this.styleEl?.remove();
        if (this.status) { this.status.remove(); this.status = null; }
        if (this.ribbonEl) { this.ribbonEl.remove(); this.ribbonEl = null; }
    }

    injectStyle() {
        this.styleEl = document.createElement('style');
        this.styleEl.setAttribute('data-note-content-zoom', 'true');
        this.styleEl.textContent = `
:root { --note-zoom: ${this.zoom}; }

/* 编辑视图（CM6）：缩放内容容器，并用宽度反除保持布局宽度 */
.markdown-source-view.mod-cm6 .cm-sizer {
  transform: scale(var(--note-zoom));
  transform-origin: top left;
  width: calc(100% / var(--note-zoom));
}

/* 阅读视图：同理缩放 markdown 预览容器 */
.markdown-reading-view .markdown-preview-sizer {
  transform: scale(var(--note-zoom));
  transform-origin: top left;
  width: calc(100% / var(--note-zoom));
}

/* 外层容器滚动（不参与 transform） */
.markdown-source-view.mod-cm6 .cm-scroller,
.markdown-reading-view {
  overflow: auto;
}

/* 状态栏样式（可点击重置） */
.status-bar-item.note-zoom-status { cursor: pointer; }
    `.trim();
        document.head.appendChild(this.styleEl);
    }

    // 定位滚动容器（编辑/阅读）
    getScrollContext(ev) {
        const path = ev.composedPath?.() || [];
        const scroller = path.find(n => n?.classList?.contains?.('cm-scroller'));
        if (scroller) return { type: 'edit', scroller };
        const reader = path.find(n => n?.classList?.contains?.('markdown-reading-view'));
        if (reader) return { type: 'read', scroller: reader };
        const preview = path.find(n => n?.classList?.contains?.('markdown-preview-view'));
        if (preview) return { type: 'read', scroller: preview };
        return null;
    }

    // 缩放前后做滚动补偿：围绕鼠标（或视口中心）保持视觉焦点
    adjustScrollForZoom(ctx, oldZoom, newZoom, ev) {
        const scroller = ctx.scroller;
        const rect = scroller.getBoundingClientRect();

        const anchorX = this.settings.anchorToMouse ? (ev.clientX - rect.left) : (rect.width / 2);
        const anchorY = this.settings.anchorToMouse ? (ev.clientY - rect.top) : (rect.height / 2);

        // 内容坐标（未缩放布局下的位置）
        const contentX = (scroller.scrollLeft + anchorX) / oldZoom;
        const contentY = (scroller.scrollTop + anchorY) / oldZoom;

        // 新滚动值：让同一内容点继续落在同一屏幕位置
        let newScrollLeft = contentX * newZoom - anchorX;
        let newScrollTop = contentY * newZoom - anchorY;

        // 边界保护
        newScrollLeft = Math.max(0, Math.min(newScrollLeft, scroller.scrollWidth));
        newScrollTop = Math.max(0, Math.min(newScrollTop, scroller.scrollHeight));

        if (this.settings.keepFocus) {
            scroller.scrollTo({ left: newScrollLeft, top: newScrollTop, behavior: 'instant' });
        }
    }

    async setZoom(v, opts = {}) {
        const { toast = true, save = true } = opts;
        this.zoom = clamp(v, MIN, MAX);
        document.documentElement.style.setProperty('--note-zoom', String(this.zoom));
        this.renderStatus();
        if (save) await this.saveState();
        if (toast) new Notice(`Note content zoom: ${(this.zoom * 100).toFixed(0)}%`);
    }

    async saveState() {
        await this.saveData({ zoom: this.zoom, settings: this.settings });
    }

    updateRibbon() {
        if (this.settings.showRibbonReset) {
            if (!this.ribbonEl) {
                this.ribbonEl = this.addRibbonIcon(
                    'zoom-in',
                    '一键还原笔记内容到 100%',
                    () => this.setZoom(1.0)
                );
            }
        } else if (this.ribbonEl) {
            this.ribbonEl.remove(); this.ribbonEl = null;
        }
    }

    updateStatus() {
        if (this.settings.showStatus) {
            if (!this.status) this.status = this.addStatusBarItem();
            this.status.addClass('note-zoom-status');
            this.renderStatus();
            this.status.setAttr('title', '点击重置到 100%');
            this.status.onclick = () => this.setZoom(1.0);
        } else if (this.status) {
            this.status.remove(); this.status = null;
        }
    }

    renderStatus() {
        if (this.status) this.status.setText(`Note Zoom ${Math.round(this.zoom * 100)}%`);
    }
};

class NoteZoomSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Note Content Zoom 设置' });

        new Setting(containerEl)
            .setName('滚轮步进（每次缩放幅度）')
            .setDesc('范围 0.02–0.50，默认 0.10。数值越大缩放越快。')
            .addSlider(s => {
                s.setLimits(0.02, 0.50, 0.01)
                    .setDynamicTooltip()
                    .setValue(this.plugin.settings.step)
                    .onChange(async (value) => {
                        this.plugin.settings.step = Number(value);
                        await this.plugin.saveState();
                    });
            });

        new Setting(containerEl)
            .setName('启动时自动还原到 100%')
            .setDesc('每次启动 Obsidian 时，将笔记内容缩放重置为 100%。')
            .addToggle(t => {
                t.setValue(this.plugin.settings.resetOnStartup)
                    .onChange(async (v) => {
                        this.plugin.settings.resetOnStartup = v;
                        await this.plugin.saveState();
                    });
            });

        new Setting(containerEl)
            .setName('显示功能区一键还原按钮')
            .setDesc('在左侧功能区显示一个按钮，单击即可重置为 100%。')
            .addToggle(t => {
                t.setValue(this.plugin.settings.showRibbonReset)
                    .onChange(async (v) => {
                        this.plugin.settings.showRibbonReset = v;
                        await this.plugin.saveState();
                        this.plugin.updateRibbon();
                    });
            });

        new Setting(containerEl)
            .setName('显示状态栏指示器（可点击重置）')
            .setDesc('状态栏显示当前缩放；点击可立即重置到 100%。')
            .addToggle(t => {
                t.setValue(this.plugin.settings.showStatus)
                    .onChange(async (v) => {
                        this.plugin.settings.showStatus = v;
                        await this.plugin.saveState();
                        this.plugin.updateStatus();
                    });
            });

        new Setting(containerEl)
            .setName('滚轮缩放围绕鼠标位置')
            .setDesc('开启后，缩放以鼠标位置为中心，体验更顺滑。（默认开启）')
            .addToggle(t => {
                t.setValue(this.plugin.settings.anchorToMouse)
                    .onChange(async (v) => {
                        this.plugin.settings.anchorToMouse = v;
                        await this.plugin.saveState();
                    });
            });

        new Setting(containerEl)
            .setName('缩放后保持焦点（滚动补偿）')
            .setDesc('根据缩放比例自动校正 scrollTop/Left，避免视野跳动。（默认开启）')
            .addToggle(t => {
                t.setValue(this.plugin.settings.keepFocus)
                    .onChange(async (v) => {
                        this.plugin.settings.keepFocus = v;
                        await this.plugin.saveState();
                    });
            });

        new Setting(containerEl)
            .setName('一键还原到 100%（现在）')
            .setDesc('点击立即将笔记内容缩放设为 100%。')
            .addButton(b => {
                b.setButtonText('还原到 100%')
                    .onClick(() => this.plugin.setZoom(1.0));
            });

        new Setting(containerEl)
            .setName('当前缩放')
            .setDesc(() => `Note Zoom ${Math.round(this.plugin.zoom * 100)}%`);
    }
}
