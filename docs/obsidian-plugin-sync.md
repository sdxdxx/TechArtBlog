# Obsidian plugin sync

The source of truth for the authoring setup is `E:\Obsidian\DXX的知识库\.obsidian`.
`content/.obsidian` carries the same enabled plugin runtime, with `Components` deliberately excluded.

## Active replacements

- `xd-attachment-manager` replaces Attachment Management, Image Converter, Janitor, and XD Empty Folder Cleaner.
- `xd-code-renderer` replaces Code Styler and Shiki Highlighter.
- Core Canvas plus `xd-attachment-manager` replaces Advanced Canvas for the published workflow.
- `xd-visual-core` remains the visual settings source for media, headings, emphasis, tables, and editor presentation.

`font-color-live-preview` is retained from `content` because the source vault currently has an enabled but empty plugin directory.

## Local-only settings

Plugin executables and manifests are tracked, but API-bearing or device-specific state is ignored:

- Translator, QuickAdd, Excalidraw, Editing Toolbar, BRAT, and OpenCode `data.json`
- XD Attachment Manager migration/integrity state
- XD Code Renderer downloaded resource packs
- Zhihu login/session data

These files stay present locally. Do not force-add them with `git add -f`; configure API keys in Obsidian after cloning instead.

## Publish contract

Visual attachments managed by XD Attachment Manager use an adjacent preview:

```text
Board.canvas              -> Board.preview.png
Drawing.excalidraw.md     -> Drawing.excalidraw.preview.png
```

Quartz resolves `![[...canvas]]`, `![[...excalidraw]]`, and `![[...excalidraw.md]]` to those previews. If a Canvas preview is absent, the browser reads the copied `.canvas` JSON and renders a responsive fallback. Excalidraw uses the manager-generated PNG so embedded images and fonts match Obsidian; a visible unavailable state replaces a broken image if that preview is missing.

Media aliases follow the Visual Core convention:

```markdown
![[image.png|Caption|640]]
![[clip.mp4|Demo|800x450]]
```

Images and videos are centered with captions and responsive size limits. Code uses Dark Plus in both site themes and accepts XD Code Renderer title metadata:

````markdown
```cpp title:"file.cpp"

```
````
