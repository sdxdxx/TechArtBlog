
'use strict';

/**
 * Obsidian plugin: Font Color Live Preview
 * - Hide the literal <font color="..."> and </font> code in Live Preview
 * - Render only the inner text, colored per the color value
 * This version is pre-built (no npm build step). Drop the folder into
 * .obsidian/plugins/font-color-live-preview/ and enable.
 *
 * NOTE: This relies on Obsidian's runtime availability of CodeMirror 6 modules.
 * If your Obsidian build does not expose @codemirror/view/state to require(),
 * please let me know—I can ship a fully-bundled variant.
 */

let obsidian;
try { obsidian = require('obsidian'); } catch (e) {
  console.error('[font-color-live-preview] Cannot load obsidian module.', e);
}

let viewPkg, statePkg;
try { viewPkg = require('@codemirror/view'); } catch (e) {
  console.error('[font-color-live-preview] Cannot load @codemirror/view. This Obsidian build may not expose CM6 packages via require().', e);
}
try { statePkg = require('@codemirror/state'); } catch (e) {
  console.error('[font-color-live-preview] Cannot load @codemirror/state. This Obsidian build may not expose CM6 packages via require().', e);
}

const Plugin = obsidian?.Plugin;
const EditorView = viewPkg?.EditorView;
const ViewPlugin = viewPkg?.ViewPlugin;
const Decoration = viewPkg?.Decoration;
const RangeSetBuilder = statePkg?.RangeSetBuilder;

// Very tolerant font tag regex: <font color="...">...</font>
const FONT_RE_GLOBAL = /<font\s+color\s*=\s*(['"])?([^"'>]+)\1?\s*>([\s\S]*?)<\/font>/gi;

/** Build decorations for all visible ranges in the editor */
function buildDecorations(view) {
  if (!RangeSetBuilder || !Decoration) return Decoration?.none || viewPkg.Decoration.none;
  const builder = new RangeSetBuilder();

  for (const { from, to } of view.visibleRanges) {
    const slice = view.state.doc.sliceString(from, to);
    FONT_RE_GLOBAL.lastIndex = 0;

    let m;
    while ((m = FONT_RE_GLOBAL.exec(slice))) {
      const matchText = m[0];
      const color = (m[2] || '').trim();
      const inner = m[3] || '';

      const matchStart = from + m.index;
      const matchEnd = matchStart + matchText.length;

      // Compute ranges: <font ...> | inner | </font>
      const openTagEndRel = matchText.indexOf('>');
      if (openTagEndRel === -1) continue;
      const openStart = matchStart;
      const openEnd = matchStart + openTagEndRel + 1;

      const contentStart = openEnd;
      const contentEnd = contentStart + inner.length;

      const closeStart = contentEnd;
      const closeEnd = matchEnd;

      // Hide opening tag
      builder.add(openStart, openEnd, Decoration.replace({}));
      // Hide closing tag
      builder.add(closeStart, closeEnd, Decoration.replace({}));
      // Colorize inner text
      builder.add(contentStart, contentEnd, Decoration.mark({
        attributes: { style: `color: ${color} !important;` }
      }));
    }
  }

  return builder.finish();
}

// Define the CM6 view plugin (no editor state fields required)
const FontColorPlugin = ViewPlugin && ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = buildDecorations(view);
  }
  update(update) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = buildDecorations(update.view);
    }
  }
}, {
  decorations: v => v.decorations
});

class FontColorLivePreviewPlugin extends Plugin {
  async onload() {
    if (!FontColorPlugin || !this.registerEditorExtension) {
      console.warn('[font-color-live-preview] Fallback: CodeMirror 6 is unavailable; plugin will not activate.');
      return;
    }
    this.registerEditorExtension(FontColorPlugin);
    console.log('[font-color-live-preview] Loaded');
  }
  onunload() {
    console.log('[font-color-live-preview] Unloaded');
  }
}

module.exports = FontColorLivePreviewPlugin;
