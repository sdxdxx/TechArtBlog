<%*
const leaf = app.workspace.activeLeaf;
const view = leaf && leaf.view;
const editor = view && view.editor;

if (editor) {
  const cursor = editor.getCursor();
  tR = "光标位置: " + JSON.stringify(cursor);
} else {
  new Notice("❌ 当前没有 editor。请确认是在笔记编辑模式里运行，并且使用 Insert template。");
  tR = "没有 editor";
}
%>
