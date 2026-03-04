<%*
/**
 * 将当前 MD 转成 Excalidraw，并尽量避免文本与图片/嵌入重叠：
 * - 标题/段落/列表 → 文本元素（按层级缩进）
 * - 图片（本地/![[...]]/![](...)）→ addImage（先测量原图尺寸再估算占位）
 * - 其它文件（mp4/pdf/md/音视频/office/zip…）→ addEmbeddable（固定宽高）
 * - 外链（http/https 的图片/视频/PDF等）→ addEmbeddable(url)
 * - 按层级维护列高 columnY[level]，放置后推进，避免重叠
 */

const ea = ExcalidrawAutomate;

// ============ 可调参数 ============
const ROOT_DIR = "Assets";
const FILE_PREFIX = "map";
const WAIT_MS = 220;

const MARGIN_X = 80;
const MARGIN_Y = 80;
const COL_INDENT = 320;           // 每层缩进一列
const TEXT_LINE_H = 36;           // 普通文本行高估算
const HEADING_EXTRA = 12;         // 标题额外间距
const LIST_BULLET = "• ";

const IMG_MAX_W = 560;            // 图片最大显示宽（用于估算占位）
const IMG_MAX_H = 600;            // 图片最大显示高（用于估算占位上限）
const MEDIA_V_SPACING = 16;       // 媒体（图片/嵌入）下方额外留白

const EMBED_W = 560;              // 非图片嵌入宽
const EMBED_H = 315;              // 非图片嵌入高（16:9）
// =================================

const IMAGE_EXTS = new Set(["png","jpg","jpeg","gif","webp","svg","bmp","avif"]);
const isURL = (s)=>/^https?:\/\//i.test(s);
const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
const escapeRegex = (s)=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

// ---------- 上下文 ----------
const leaf = app.workspace.activeLeaf;
const view = leaf && leaf.view;
const editor = view && view.editor;
const currentFile = view && view.file;

if (!editor || !currentFile) { new Notice("❌ 请在要转换的 Markdown 笔记中运行。"); return; }
if ((currentFile.extension||"").toLowerCase()==="excalidraw") { new Notice("⚠️ 当前就是 Excalidraw。"); return; }

const md = await app.vault.read(currentFile);
const lines = md.split(/\r?\n/);

// ---------- 输出路径 & 编号（兼容 .excalidraw/.excalidraw.md） ----------
const noteTitle = tp.file.title;
//const folder = `${ROOT_DIR}/NoteAssets_${noteTitle}`;
const folder = `${ROOT_DIR}/Excalidraw`;
await app.vault.createFolder(folder).catch(()=>{});

const safeTitle = escapeRegex(noteTitle);
const safePrefix = escapeRegex(FILE_PREFIX);
const rx = new RegExp(`^${safeTitle}_${safePrefix}(\\d+)\\.excalidraw(\\.md)?$`);
let maxIndex = 0;
for (const f of app.vault.getFiles()) {
  if (!f.path.startsWith(folder + "/")) continue;
  const mm = f.name.match(rx);
  if (mm) { const n = parseInt(mm[1],10); if (n>maxIndex) maxIndex = n; }
}
const nextIndex = maxIndex + 1;
const drawName = `${noteTitle}_${FILE_PREFIX}${nextIndex}`;
const basePath = `${folder}/${drawName}`;

// ---------- 创建并绑定 Excalidraw ----------
ea.reset();
const created = await ea.create({ filename: drawName, foldername: folder, onNewPane: false });
await sleep(WAIT_MS);

let excalFile =
  app.vault.getAbstractFileByPath(`${basePath}.excalidraw.md`) ||
  app.vault.getAbstractFileByPath(`${basePath}.excalidraw`) ||
  app.vault.getAbstractFileByPath(created);

if (!excalFile) { new Notice("❌ 创建 Excalidraw 失败。"); return; }

const exLeaf = app.workspace.getLeaf(true);
await exLeaf.openFile(excalFile);
await sleep(WAIT_MS);
ea.setView("active");

// ---------- 布局辅助 ----------
const columnY = new Map(); // level -> currentY
const baseY = ()=>MARGIN_Y;
const getY = (lvl)=> columnY.has(lvl) ? columnY.get(lvl) : baseY();
const setY = (lvl, y)=> columnY.set(lvl, y);

const dirname = currentFile.path.includes("/")
  ? currentFile.path.slice(0, currentFile.path.lastIndexOf("/"))
  : "";

function levelX(level){ return MARGIN_X + level * COL_INDENT; }
function normPath(p){
  p = p.trim().replace(/^<|>$/g,"");
  if (p.startsWith("/")) return p.replace(/^\/+/,"");
  if (p.startsWith("./") || p.startsWith("../")){
    const parts = (dirname ? dirname.split("/") : []).concat(p.split("/"));
    const stack=[];
    for (const seg of parts){
      if (!seg || seg===".") continue;
      if (seg==="..") stack.pop();
      else stack.push(seg);
    }
    return stack.join("/");
  }
  return p;
}

// 读取图片原始尺寸，返回估算后的显示宽高（按 IMG_MAX_W/H）
async function estimateImageSize(file){
  try{
    const buf = await app.vault.readBinary(file);
    const blob = new Blob([buf]);
    const url = URL.createObjectURL(blob);
    const img = new Image();
    await new Promise((res,rej)=>{ img.onload=()=>res(); img.onerror=rej; img.src=url; });
    URL.revokeObjectURL(url);

    let w = img.naturalWidth || IMG_MAX_W;
    let h = img.naturalHeight || IMG_MAX_H;

    if (w > IMG_MAX_W){
      const s = IMG_MAX_W / w; w = Math.round(w*s); h = Math.round(h*s);
    }
    if (h > IMG_MAX_H){
      const s = IMG_MAX_H / h; w = Math.round(w*s); h = Math.round(h*s);
    }
    return {w,h};
  }catch(e){
    console.warn("估算图片尺寸失败，使用默认高度", file?.path, e);
    return {w: IMG_MAX_W, h: Math.min(IMG_MAX_H, 260)};
  }
}

// 插入图片/嵌入，并推进该列的 Y，避免后续重叠
async function placeMediaAtLevel(target, level){
  const x = levelX(level);
  let y = getY(level);

  if (typeof target === "string" && isURL(target)){
    // 外链 → embeddable(url)
    ea.addEmbeddable(x, y, EMBED_W, EMBED_H, target);
    setY(level, y + EMBED_H + MEDIA_V_SPACING);
    return;
  }

  // 本地文件解析
  let file = target;
  if (!(file?.path)){
    const resolved = normPath(target);
    file = app.vault.getAbstractFileByPath(resolved)
        || app.metadataCache.getFirstLinkpathDest(resolved, currentFile.path)
        || app.vault.getFiles().find(f=>f.name===resolved.split("/").pop());
  }
  if (!file){ 
    // 找不到文件，留文本提示并推进
    ea.addText(x, y, `(未找到) ${target}`);
    setY(level, y + TEXT_LINE_H);
    return;
  }

  const ext = (file.extension||"").toLowerCase();
  if (IMAGE_EXTS.has(ext)){
    // 先估尺寸来推进 Y（addImage 不一定暴露实际尺寸）
    const {h} = await estimateImageSize(file);
    await ea.addImage(x, y, file, true, true);
    setY(level, y + h + MEDIA_V_SPACING);
  }else{
    // 任意非图片 → 固定大小的 embeddable
    ea.addEmbeddable(x, y, EMBED_W, EMBED_H, undefined, file);
    setY(level, y + EMBED_H + MEDIA_V_SPACING);
  }
}

// 插入文本并推进列 Y
function placeTextAtLevel(text, level, isHeading=false){
  const x = levelX(level);
  const y = getY(level);
  ea.addText(x, y, text);
  setY(level, y + TEXT_LINE_H + (isHeading ? HEADING_EXTRA : 0));
}

// ---------- 解析并排版 ----------
let inCode = false;

function plainAfterRemoving(regex, s){ return s.replace(regex, "").trim(); }

for (let i=0; i<lines.length; i++){
  let line = lines[i];

  // 代码块
  if (/^\s*```/.test(line)){ inCode = !inCode; if (!inCode){ /*end*/ } continue; }
  if (inCode){ placeTextAtLevel(line, 0, false); continue; }

  // 空行
  if (/^\s*$/.test(line)){ setY(0, getY(0) + 8); continue; }

  // 标题
  const h = line.match(/^\s{0,3}(#{1,6})\s+(.*)$/);
  if (h){
    const level = h[1].length - 1; // H1→0列，H2→1列……
    const text = h[2].trim();
    placeTextAtLevel(text, level, true);
    continue;
  }

  // 列表
  const li = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
  if (li){
    const spaces = li[1].length;
    const level = Math.floor(spaces/2); // 每2空格一层
    placeTextAtLevel(LIST_BULLET + li[3], level, false);
    continue;
  }

  // 图片/嵌入：先插媒体、推进Y，再放文本，避免重叠
  const hadWikiImgs = [...line.matchAll(/!\[\[(.+?)\]\]/g)];
  const hadMdImgs   = [...line.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)];

  if (hadWikiImgs.length || hadMdImgs.length){
    // 1) 放媒体
    for (const m of hadWikiImgs){
      let inner = m[1].trim();
      inner = inner.split("|")[0].split("#")[0].split("^")[0].trim();
      await placeMediaAtLevel(inner, 0);
    }
    for (const m of hadMdImgs){
      let target = m[1].trim().replace(/^<|>$/g,"");
      await placeMediaAtLevel(target, 0);
    }
    // 2) 放剩余文本（已经把媒体去掉再渲染）
    const rest = line
      .replace(/!\[\[(.+?)\]\]/g, "")
      .replace(/!\[[^\]]*\]\(([^)]+)\)/g, "")
      .trim();
    if (rest) placeTextAtLevel(rest, 0, false);
    continue;
  }

  // 普通 wikilink → 把 [[...|alias]] 渲染为 alias 文本
  const wikiLinks = [...line.matchAll(/\[\[([^\]|#^]+)(?:[#^][^\]]*)?(?:\|([^\]]+))?\]\]/g)];
  if (wikiLinks.length){
    let rendered = line;
    for (const m of wikiLinks){
      const dest = m[1].trim();
      const alias = (m[2]||dest).trim();
      rendered = rendered.replace(m[0], alias);
    }
    placeTextAtLevel(rendered.trim(), 0, false);
    continue;
  }

  // 其它 → 纯文本
  placeTextAtLevel(line.trim(), 0, false);
}

// ---------- 添加到画布 ----------
await ea.addElementsToView(true, true);

// ---------- 在光标下方插入引用 ----------
await sleep(20);
const linkTarget = (excalFile.extension === "md")
  ? `${basePath}.excalidraw.md`
  : `${basePath}.excalidraw`;
const cur = editor.getCursor();
editor.replaceRange(`\n![[${linkTarget}]]\n`, {line: cur.line+1, ch: 0});

new Notice(`✅ 已生成：${drawName}（避免重叠布局已启用）`);
%>
