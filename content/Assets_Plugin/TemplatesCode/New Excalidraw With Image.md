<%*
/**
 * 从光标所在行的 ![[...]] 图片引用创建新的 Excalidraw 并自动插入该图片，
 * 然后把该行替换为对新建 Excalidraw 的引用。
 * 默认使用“路径插入”（稳定）。编号兼容 .excalidraw 和 .excalidraw.md。
 */

const ea = ExcalidrawAutomate;

// =================== 可调配置 ===================
const ROOT_DIR = "Assets";                 // 根目录
const FILE_PREFIX = "drawing";             // 文件前缀：<笔记名>_drawingN
const INSERT_X = 0;                        // 图片插入的初始 X
const INSERT_Y = 0;                        // 图片插入的初始 Y
const WAIT_MS_AFTER_CREATE = 200;          // 新 pane 启动等待毫秒数
// ===============================================

// 小工具
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// 1) 获取 editor / 当前文件
const leaf = app.workspace.activeLeaf;
const view = leaf && leaf.view;
const editor = view && view.editor;
const currentFile = view && view.file;
if (!editor || !currentFile) {
  new Notice("❌ 没有可用的编辑器或当前文件。");
  return;
}

// 2) 读取光标所在行，解析 ![[...]]
const cursor = editor.getCursor();
const lineText = editor.getLine(cursor.line);
const m = lineText.match(/!\[\[(.+?)\]\]/);   // 不强行要求扩展名，后面自行处理
if (!m) {
  new Notice("⚠️ 当前行未检测到图片引用（![[...]]）。");
  return;
}
let inner = m[1].trim();
// 兼容别名、尺寸、块等（path|alias、path|100、path#^block）
inner = inner.split("|")[0].split("#")[0].split("^")[0].trim();
console.log("🎯 当前行图片引用解析结果:", inner);

// 3) 解析成文件（先 metadata，再兜底按文件名）
let imgFile = app.metadataCache.getFirstLinkpathDest(inner, currentFile.path);
if (!imgFile) {
  const wantedName = inner.split("/").pop();
  imgFile = app.vault.getFiles().find(f => f.name === wantedName);
}
if (!imgFile) {
  new Notice("❌ 找不到该图片文件: " + inner);
  return;
}
console.log("🖼️ 图片文件:", imgFile.path);

// 简单校验：扩展名是否是常见图片类型
const imgExt = (imgFile.extension || "").toLowerCase();
if (!["png","jpg","jpeg","gif","webp","svg"].includes(imgExt)) {
  new Notice(`⚠️ 该文件扩展名不是常见图片类型: .${imgExt}（仍尝试插入）`);
}

// 4) 目标文件夹与自动编号
const noteTitle = tp.file.title;
const folder = `${ROOT_DIR}/NoteAssets_${noteTitle}`;
await app.vault.createFolder(folder).catch(() => {}); // 已存在忽略

// 扫描该目录下既有的 xxx.excalidraw / xxx.excalidraw.md 取最大序号
const safeTitle = escapeRegex(noteTitle);
const re = new RegExp(`^${safeTitle}_${escapeRegex(FILE_PREFIX)}(\\d+)\\.excalidraw(\\.md)?$`);
let maxIndex = 0;
for (const f of app.vault.getFiles()) {
  if (!f.path.startsWith(folder + "/")) continue;
  const mm = f.name.match(re);
  if (mm) {
    const n = parseInt(mm[1], 10);
    if (n > maxIndex) maxIndex = n;
  }
}
const nextIndex = maxIndex + 1;
const drawingName = `${noteTitle}_${FILE_PREFIX}${nextIndex}`;
const newDrawPathNoExt = `${folder}/${drawingName}`;
console.log("🆕 新建 Excalidraw 文件名:", drawingName);

// 5) 创建 Excalidraw，并确保绑定到新视图
ea.reset();
await ea.create({
  filename: drawingName,
  foldername: folder,
  onNewPane: true,
});
await sleep(WAIT_MS_AFTER_CREATE);

// 保险：显式绑定到最新的 Excalidraw 视图
let exLeaves = app.workspace.getLeavesOfType("excalidraw");
if (!exLeaves.length) {
  new Notice("❌ 未找到 Excalidraw 视图。");
  return;
}
const newLeaf = exLeaves[exLeaves.length - 1];
ea.setView(newLeaf.view);

// 6) 插入图片（稳定方式：直接用 vault 路径）
try {
  await ea.addImage(INSERT_X, INSERT_Y, imgFile.path);
  await ea.addElementsToView(true, true);
  console.log("✅ 图片已插入至画布");
} catch (e) {
  console.error("❌ 插入图片失败：", e);
  new Notice("❌ 插入图片失败，请看控制台日志。");
  return;
}

// 7) 替换当前行 → 指向新建的 .excalidraw
// 小等一会儿，避免跟其他插件的编辑冲突
await sleep(30);
editor.setLine(cursor.line, `![[${newDrawPathNoExt}.excalidraw]]`);
new Notice(`✅ 已创建 ${drawingName} 并导入图片`);
%>
