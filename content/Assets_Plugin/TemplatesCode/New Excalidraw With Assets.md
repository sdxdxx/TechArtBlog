<%*
/**
 * 从光标所在行的 ![[...]] 引用创建新的 Excalidraw 并插入：
 * - 图片：addImage（传 vault 路径）
 * - 其他：addEmbeddable（传 TFile）
 * 保持原 Markdown 面板，Excalidraw在**新 pane**打开；插入后**强制写盘**再替换当前行。
 */

const ea = ExcalidrawAutomate;

// ===== 可调参数 =====
const ROOT_DIR = "Assets";
const FILE_PREFIX = "drawing";
const INSERT_X = 0;
const INSERT_Y = 0;
const EMBED_W  = 560;
const EMBED_H  = 315;
const WAIT_MS_AFTER_CREATE = 260;   // 视图就绪缓冲
const WAIT_MS_BEFORE_EDIT  = 60;    // 写盘后再改当前行的缓冲
// ====================

const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
const escapeRegex = (s)=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

// 1) 获取 editor / 当前文件
const leaf = app.workspace.activeLeaf;
const view = leaf?.view;
const editor = view?.editor;
const currentFile = view?.file;
if (!editor || !currentFile) {
  new Notice("❌ 没有可用的编辑器或当前文件。");
  return;
}

// 2) 解析光标行的 ![[...]]（安全正则）
const cursor = editor.getCursor();
const lineText = editor.getLine(cursor.line);
const m = lineText.match(/!\[\[([^\]]+?)\]\]/);
if (!m) {
  new Notice("⚠️ 当前行未检测到 ![[...]] 引用。");
  return;
}
let inner = m[1].trim();
inner = inner.split("|")[0].split("#")[0].split("^")[0].trim();
console.log("🎯 当前行引用解析结果:", inner);

// 3) 解析为 TFile
let targetFile = app.metadataCache.getFirstLinkpathDest(inner, currentFile.path);
if (!targetFile) {
  const wantedName = inner.split("/").pop();
  targetFile = app.vault.getFiles().find(f => f.name === wantedName) || null;
}
if (!targetFile) {
  new Notice("❌ 找不到该文件: " + inner);
  return;
}
console.log("📄 目标文件:", targetFile.path);

// 4) 判定是否图片
const IMG_EXTS = new Set(["png","jpg","jpeg","gif","webp","svg","bmp","avif"]);
const ext = (targetFile.extension || "").toLowerCase();
const isImage = IMG_EXTS.has(ext);

// 5) 目标目录与自动编号（兼容 .excalidraw / .excalidraw.md）
const noteTitle = tp.file.title;
const folder = `${ROOT_DIR}/NoteAssets_${noteTitle}`;
await app.vault.createFolder(folder).catch(()=>{});
const rx = new RegExp(`^${escapeRegex(noteTitle)}_${escapeRegex(FILE_PREFIX)}(\\d+)\\.excalidraw(\\.md)?$`);
let maxIndex = 0;
for (const f of app.vault.getFiles()) {
  if (!f.path.startsWith(folder + "/")) continue;
  const mm = f.name.match(rx);
  if (mm) maxIndex = Math.max(maxIndex, parseInt(mm[1],10));
}
const nextIndex = maxIndex + 1;
const drawingName = `${noteTitle}_${FILE_PREFIX}${nextIndex}`;
console.log("🆕 新建 Excalidraw 文件名:", drawingName);

// 6) 创建并在“新 pane”打开
ea.reset();
const createdPath = await ea.create({
  filename: drawingName,
  foldername: folder,
  onNewPane: true,             // 关键：新 pane，不替换当前 Markdown
  // frontmatterKeys: {"excalidraw-plugin":"parsed"} // 需要可开启
});
await sleep(WAIT_MS_AFTER_CREATE);

// 6.1 绑定到当前激活的 Excalidraw 视图（最稳）
ea.setView("active");
const excalView = ea.targetView;
const excalFile = excalView?.file;
if (!excalView || !excalFile) {
  new Notice("❌ 未找到新建的 Excalidraw 视图。");
  return;
}

// 6.2 等待 Excalidraw API 就绪（避免初始化未完成就插入）
async function waitViewReady(maxTry=40){
  for (let i=0;i<maxTry;i++){
    try{
      const api = ea.getExcalidrawAPI();
      if (api && typeof api.getSceneElements === "function") return true;
    }catch(_){}
    await sleep(50);
  }
  return false;
}
if (!(await waitViewReady())) {
  new Notice("❌ Excalidraw 视图未就绪。");
  return;
}

// 7) 插入元素（图片传路径；其他传 TFile）
try {
  if (isImage) {
    await ea.addImage(INSERT_X, INSERT_Y, targetFile.path);
  } else {
    ea.addEmbeddable(INSERT_X, INSERT_Y, EMBED_W, EMBED_H, undefined, targetFile);
  }

  // ——关键：保存到文件（第二个参数 save = true）——
  await ea.addElementsToView(false, true);  // 不重定位到指针，直接保存
  // 双保险：显式触发视图保存
  if (typeof excalView.save === "function") {
    await excalView.save();
  }
  console.log("✅ 元素已插入并写盘");
} catch (e) {
  console.error("❌ 插入/保存失败：", e);
  new Notice("❌ 插入/保存失败，请看控制台日志。");
  return;
}

// 8) 写盘完成后再替换当前行（避免过早切回导致保存被打断）
await sleep(WAIT_MS_BEFORE_EDIT);
editor.setLine(cursor.line, `![[${excalFile.path}]]`);
new Notice(`✅ 已创建 ${drawingName}（新 pane）并完成插入与保存`);
%>
