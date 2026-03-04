<%*
/** 删除 Assets/ 下空文件夹，只通过 Notice 提示，不输出到当前笔记 **/

const dryRun   = false;        // true = 预览；false = 真删
const basePath = 'Assets';    // 限定目录
const excludeFolders = [
  // 'Assets/NoteAssets_*',
  // /Assets\/Excalidraw.*Assets/
];

const isFolder = (x) => x && Array.isArray(x.children);
const isFile   = (x) => x && typeof x.extension === 'string';

const wildcardToReg = (s) =>
  new RegExp('^' + s.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*'));
const isExcluded = (p) => excludeFolders.some((pat) => {
  if (pat instanceof RegExp) return pat.test(p);
  if (typeof pat === 'string') {
    const re = pat.includes('*') ? wildcardToReg(pat) : null;
    return re ? re.test(p) : p === pat || p.startsWith(p + '/');
  }
  return false;
});

const base = app.vault.getAbstractFileByPath(basePath);
if (!isFolder(base)) {
  new Notice(`❌ 未找到文件夹：${basePath}`);
  return;
}

// 找出所有子文件夹
const allFolders = [];
const stack = [base];
while (stack.length) {
  const cur = stack.pop();
  for (const ch of cur.children) {
    if (isFolder(ch)) { allFolders.push(ch); stack.push(ch); }
  }
}
// 深度优先，从深到浅
allFolders.sort((a,b) => b.path.split('/').length - a.path.split('/').length);

function hasAnyFile(folder) {
  const s = [folder];
  while (s.length) {
    const f = s.pop();
    for (const ch of f.children) {
      if (isFile(ch)) return true;
      if (isFolder(ch)) {
        if (isExcluded(ch.path)) return true; // 把排除目录视为“非空”
        s.push(ch);
      }
    }
  }
  return false;
}

const toDelete = [];
for (const f of allFolders) {
  if (isExcluded(f.path)) continue;
  if (!hasAnyFile(f)) toDelete.push(f);
}

if (dryRun) {
  new Notice(`预览：${basePath}/ 下将删除 ${toDelete.length} 个空文件夹\n\n${toDelete.map(f=>f.path).join('\n')}`, 8000);
} else {
  let ok = 0, failed = [];
  for (const f of toDelete) {
    try { await app.vault.delete(f, true); ok++; }
    catch (e) { failed.push([f.path, String(e)]); }
  }
  new Notice(
    `已删除 ${ok} 个空文件夹（范围：${basePath}/）${failed.length?`\n失败 ${failed.length} 个`:''}\n\n${toDelete.map(f=>f.path).join('\n')}`,
    8000
  );
}
%>
