// 仅在 Excalidraw 绘图模式运行；三种落点 + 情况3重判；过滤规则；逐个进度；防空目录清理
(() => {
  const EA = ExcalidrawAutomate;

  /******** 常量与可配 ********/
  const ROOT_ASSETS_DIR   = "Assets";
  const NOTEASSETS_PREFIX = "Assets/NoteAssets_";
  const EXA_PREFIX        = "ExcalidrawAssets_";
  const ZERO_PAD          = 2;

  const ATTACH_EXTS = [
    "png","jpg","jpeg","webp","gif","svg","heic","tif","tiff",
    "pdf","doc","docx","ppt","pptx","xls","xlsx","csv","txt","md",
    "mp3","wav","m4a","flac","ogg",
    "mp4","mov","mkv","webm"
  ];
  const BLOCK_MOVE_EXTS = new Set(["pdf","doc","docx","ppt","pptx","xls","xlsx","csv","txt","md"]);

  const EXT_TYPE_MAP = {
    png:"image", jpg:"image", jpeg:"image", webp:"image", gif:"image",
    svg:"image", heic:"image", tif:"image", tiff:"image",
    txt:"doc", md:"doc", doc:"doc", docx:"doc", ppt:"doc", pptx:"doc",
    xls:"sheet", xlsx:"sheet", csv:"sheet",
    pdf:"pdf",
    mp3:"audio", wav:"audio", m4a:"audio", flac:"audio", ogg:"audio",
    mp4:"video", mov:"video", mkv:"video", webm:"video",
  };
  const TYPE_RULES = {
    image: "IMG_${note}_${yyyy}${MM}${dd}_${i}",
    pdf:   "PDF_${note}_${yyyy}${MM}${dd}_${i}",
    doc:   "DOC_${note}_${yyyy}${MM}${dd}_${i}",
    sheet: "SHEET_${note}_${yyyy}${MM}${dd}_${i}",
    audio: "AUD_${note}_${yyyy}${MM}${dd}_${i}",
    video: "VID_${note}_${yyyy}${MM}${dd}_${i}",
    other: "ATT_${note}_${yyyy}${MM}${dd}_${i}",
  };

  /******** 小工具 ********/
  const norm = p => (p||"").replace(/\\/g,"/").replace(/\/+/g,"/");
  const sanitize = s => (s||"").replace(/[\\/:*?"<>|#^\[\]\{\}\(\)\s]+/g,"_").replace(/_+/g,"_").replace(/^_|_$/g,"");
  const pad = (n,w)=>{ const s=String(n); return s.length>=w?s:"0".repeat(w-s.length)+s; };
  const fmtDate = (d,tmpl)=> tmpl
    .replace("${yyyy}", d.getFullYear())
    .replace("${MM}",   pad(d.getMonth()+1,2))
    .replace("${dd}",   pad(d.getDate(),2))
    .replace("${HH}",   pad(d.getHours(),2))
    .replace("${mm}",   pad(d.getMinutes(),2))
    .replace("${ss}",   pad(d.getSeconds(),2));
  const dirname = p => { p = norm(p); const i = p.lastIndexOf("/"); return i<0 ? "" : p.slice(0,i); };

  function getActiveViewType() {
    const ws = app.workspace;
    const leaf = ws?.getMostRecentLeaf?.() || ws?.activeLeaf || ws?.getActiveLeaf?.();
    return leaf?.view?.getViewType?.();
  }
  function ensureExcalidrawDrawingViewOrExit() {
    const vt = getActiveViewType();
    if (vt !== "excalidraw") {
      new Notice(`❌ 当前不在 Excalidraw 绘图模式（当前视图：${vt ?? "unknown"}）。此脚本仅在绘图模式可用。`);
      return false;
    }
    new Notice("🟢 检测到 Excalidraw 绘图模式，开始整理附件…");
    return true;
  }

  async function ensureFolder(path){
    const ad = app.vault.adapter; path = norm(path);
    if (!(await ad.exists(path))) await app.vault.createFolder(path);
  }
  async function folderExists(path){
    return await app.vault.adapter.exists(norm(path));
  }
  async function removeFolderIfEmpty(path){
    try {
      const f = app.vault.getAbstractFileByPath(norm(path));
      if (!f || !("children" in f)) return;
      if (f.children.length === 0) {
        // 用 vault.delete 更稳（不引用类型名）
        await app.vault.delete(f, true);
      }
    } catch (_) {/* 忽略清理失败 */}
  }

  async function ensureUniquePath(fullPath){
    const ad = app.vault.adapter; fullPath = norm(fullPath);
    const dot = fullPath.lastIndexOf(".");
    const base = dot >= 0 ? fullPath.slice(0,dot) : fullPath;
    const ext  = dot >= 0 ? fullPath.slice(dot)   : "";
    let i=1, cand=fullPath;
    while (await ad.exists(cand)) cand = `${base}_${pad(i++,ZERO_PAD)}${ext}`;
    return cand;
  }

  function resolvePathToFile(pth, notePath){
    const curDir = notePath.split("/").slice(0,-1).join("/");
    let dest = app.metadataCache.getFirstLinkpathDest(pth, notePath);
    if (dest) return dest;
    let try1 = norm((curDir ? `${curDir}/` : "") + pth);
    let f = app.vault.getAbstractFileByPath(try1); if (f) return f;
    let try2 = norm((curDir ? `${curDir}/` : "") + decodeURIComponent(pth));
    return app.vault.getAbstractFileByPath(try2) || null;
  }

  async function collectRefs(text, notePath){
    const results=[], seen=new Set();
    const wikiRe = /!?\[\[([^\]\|#]+)(?:#[^\]\|]+)?(?:\|[^\]]+)?\]\]/g; let m;
    while ((m=wikiRe.exec(text))!==null){
      const link = m[1].trim();
      const t = app.metadataCache.getFirstLinkpathDest(link, notePath);
      if (!t) continue;
      const abs = norm(t.path);
      if (seen.has(abs)) continue; seen.add(abs);
      results.push({ kind:"wiki", relInNote: link, absPath: abs });
    }
    const mdRe = /!?\[[^\]]*?\]\(([^)]+)\)/g;
    while ((m=mdRe.exec(text))!==null){
      let pth = m[1].trim();
      if (/^https?:\/\//i.test(pth)) continue;
      pth = pth.replace(/^['"]|['"]$/g,"");
      const t = resolvePathToFile(pth, notePath);
      if (!t) continue;
      const abs = norm(t.path);
      if (seen.has(abs)) continue; seen.add(abs);
      results.push({ kind:"md", relInNote: pth, absPath: abs });
    }
    return results.filter(it=>{
      const f = app.vault.getAbstractFileByPath(it.absPath);
      const ext = (f?.extension||"").toLowerCase();
      return ATTACH_EXTS.includes(ext);
    });
  }

  function toRelative(abs, curFolder){
    abs = norm(abs); curFolder = norm(curFolder||"");
    if (!curFolder) return abs;
    if (abs.startsWith(curFolder + "/")) return abs.slice(curFolder.length + 1);
    return abs;
  }
  function replaceAllRefs(text, item, newAbsPath, curFolder){
    const newRel = toRelative(newAbsPath, curFolder);
    const esc = s=> s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    const oldPathEsc = esc(item.relInNote);
    text = text.replace(new RegExp(`\\]\\(${oldPathEsc}\\)`,"g"), `](${newRel})`);
    const oldWikiEsc = esc(item.relInNote);
    text = text.replace(new RegExp(`\\[\\[${oldWikiEsc}(?:#[^\\]|]+)?(?:\\|[^\\]]+)?\\]\\]`,"g"), `[[${newRel}]]`);
    return text;
  }

  function extToType(ext){ return EXT_TYPE_MAP[(ext||"").toLowerCase()] || "other"; }
  function buildNameByType(tplMap, type, vars){
    const rawTpl = tplMap[type] || tplMap.other || "${note}_${type}_${i}";
    let out = rawTpl;
    for (const [k,v] of Object.entries(vars)) out = out.replaceAll("${"+k+"}", v);
    return out;
  }

  function noteAssetsContainerOf(path){
    const m = norm(path).match(/^Assets\/NoteAssets_[^/]+/);
    return m ? m[0] : null;
  }

  // —— 目标目录：严格只返回含 EXA_PREFIX 的路径 —— //
  function decideTargetFolder(noteName, curParentPath){
    const parent = norm(curParentPath||"");
    const container = noteAssetsContainerOf(parent);
    if (container) {
      // 情况2：当前绘图在某个 NoteAssets_* 下
      return { target: `${container}/${EXA_PREFIX}${noteName}`, ensureRootAssets: false };
    }
    // 情况1：当前绘图不在 NoteAssets_* 下 → 放到根 Assets/ExcalidrawAssets_<note>
    return { target: `${ROOT_ASSETS_DIR}/${EXA_PREFIX}${noteName}`, ensureRootAssets: true };
  }

  // —— 是否允许移动（你的新增规则） —— //
  function isMoveAllowedForAttachment(attPath, attExt, curParentPath){
    if (BLOCK_MOVE_EXTS.has((attExt||"").toLowerCase())) return false; // 情况1：文档类不移动
    const attParent    = dirname(attPath);
    const attContainer = noteAssetsContainerOf(attParent);
    if (!attContainer) return true; // 2_1：附件不在 NoteAssets_* → 可移动
    const curContainer = noteAssetsContainerOf(curParentPath||"");
    if (!curContainer) return false; // 2_2_1：附件在 NoteAssets_*，但当前绘图不在任何 NoteAssets_* → 不移动
    return curContainer === attContainer; // 2_2_2：仅同一 NoteAssets_* 容器才移动
  }

  (async () => {
    try {
      if (!ensureExcalidrawDrawingViewOrExit()) return;

      EA.setView?.("active");
      const cur = app.workspace.getActiveFile();
      if (!cur) throw new Error("未找到活动文件。");

      const noteName   = sanitize((cur.basename||"Note").replace(/\.md$/i,"").replace(/\.excalidraw$/i,""));
      const parentPath = cur.parent?.path || "";  // 可能是库根（空）

      // —— 情况1/2：按“当前绘图所在位置”决定本次统一目标目录 —— //
      const { target: targetFolder, ensureRootAssets } = decideTargetFolder(noteName, parentPath);

      // 仅在需要落到根 Assets 时才创建根 Assets，避免脏目录
      let createdTarget = false;
      if (ensureRootAssets) await ensureFolder(ROOT_ASSETS_DIR);
      if (!(await folderExists(targetFolder))) { await ensureFolder(targetFolder); createdTarget = true; }

      // 收集附件引用
      let content = await app.vault.read(cur);
      const refs = await collectRefs(content, cur.path);
      if (refs.length === 0) { new Notice("✅ 没有需要处理的附件引用。"); return; }

      // —— 先筛出“确实要移动”的列表（用于总数与进度） —— //
      const toMove = [];
      for (const item of refs) {
        const f = app.vault.getAbstractFileByPath(item.absPath);
        if (!f) continue;
        const ext = (f.extension||"").toLowerCase();
        if (!ATTACH_EXTS.includes(ext)) continue;

        // 情况1/2：允许性判定
        if (!isMoveAllowedForAttachment(f.path, ext, parentPath)) continue;

        // 情况3：若不在“对应的 ExcalidrawAssets_<note> 目标” → 才需要移动
        const fPath = norm(f.path);
        const inTarget = (fPath === norm(targetFolder)) || fPath.startsWith(norm(targetFolder) + "/");
        if (inTarget) continue;

        toMove.push({ file: f, item, ext });
      }

      if (toMove.length === 0) {
        // 若我们刚刚建了一个空的目标目录，但最终没有移动任何东西 → 清理它
        if (createdTarget) await removeFolderIfEmpty(targetFolder);
        new Notice("✅ 没有需要移动的附件（已符合规则或被过滤）。");
        return;
      }

      // 计数 & 时间
      const counters = {};
      const now = new Date();
      const dateVars = {
        yyyy: String(now.getFullYear()),
        MM:   pad(now.getMonth()+1,2),
        dd:   pad(now.getDate(),2),
        HH:   pad(now.getHours(),2),
        mm:   pad(now.getMinutes(),2),
        ss:   pad(now.getSeconds(),2),
      };

      let processed = 0;
      const total = toMove.length;

      // —— 逐个移动（再次“每次都基于当前绘图位置重判目标”，确保情况3严格执行 1/2 落点）—— //
      for (const { file: f, item, ext } of toMove) {
        // 每个文件再次按当前绘图位置计算“最终目标目录”
        const { target: perTarget, ensureRootAssets: needRoot } = decideTargetFolder(noteName, parentPath);
        if (needRoot) await ensureFolder(ROOT_ASSETS_DIR);
        if (!(await folderExists(perTarget))) await ensureFolder(perTarget);

        // 若此时目标仍被误判（防御性断言）：必须包含 EXA_PREFIX
        if (!perTarget.split("/").pop().startsWith(EXA_PREFIX)) {
          throw new Error(`目标目录异常：${perTarget}（应包含前缀 ${EXA_PREFIX}）`);
        }

        // 生成新名 & 移动
        const type = EXT_TYPE_MAP[ext] || "other";
        if (!(type in counters)) counters[type] = 1;

        const vars = {
          note: noteName,
          type,
          orig: sanitize(f.basename||"file"),
          i: pad(counters[type], ZERO_PAD),
          ...dateVars
        };
        let base = buildNameByType(TYPE_RULES, type, vars);
        base = fmtDate(now, base);
        base = sanitize(base);

        let destPath = norm(`${perTarget}/${base}.${ext}`);
        destPath = await ensureUniquePath(destPath);

        await app.vault.rename(f, destPath);
        counters[type]++;

        // 更新链接（相对基准：当前绘图父目录；库根用空串）
        content = replaceAllRefs(content, item, destPath, parentPath);

        processed++;
        new Notice(`✅ 已处理 ${processed}/${total}`);
      }

      await app.vault.modify(cur, content);
      new Notice(`🎉 全部完成：${processed}/${total} 个附件已移动并重命名。`);
    } catch (e) {
      console.error("[EA DrawOnly FIX2] ERROR:", e);
      new Notice(`❌ 处理失败：${e.message || e}`);
    }
  })();
})();
