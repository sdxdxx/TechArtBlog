import assert from "node:assert"
import { describe, test } from "node:test"
import { visualEmbedKind, visualPreviewPath } from "./visualEmbed"

describe("visual attachment preview paths", () => {
  test("matches XD Attachment Manager preview naming", () => {
    assert.equal(visualPreviewPath("Assets/demo.canvas"), "Assets/demo.preview.png")
    assert.equal(
      visualPreviewPath("Assets/drawing.excalidraw.md"),
      "Assets/drawing.excalidraw.preview.png",
    )
    assert.equal(
      visualPreviewPath("Assets/drawing.excalidraw"),
      "Assets/drawing.excalidraw.preview.png",
    )
  })

  test("recognizes visual sources without treating ordinary Markdown as visual", () => {
    assert.equal(visualEmbedKind("Board.CANVAS"), "canvas")
    assert.equal(visualEmbedKind("Sketch.Excalidraw.MD"), "excalidraw")
    assert.equal(visualEmbedKind("note.md"), null)
    assert.equal(visualPreviewPath("note.md"), null)
  })
})
