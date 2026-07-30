export type VisualEmbedKind = "canvas" | "excalidraw"

export function visualEmbedKind(fp: string): VisualEmbedKind | null {
  const lower = fp.toLowerCase()
  if (lower.endsWith(".canvas")) return "canvas"
  if (lower.endsWith(".excalidraw") || lower.endsWith(".excalidraw.md")) return "excalidraw"
  return null
}

export function visualPreviewPath(fp: string): string | null {
  const kind = visualEmbedKind(fp)
  if (kind === "canvas") return fp.replace(/\.canvas$/i, ".preview.png")
  if (kind === "excalidraw") {
    return fp.toLowerCase().endsWith(".md")
      ? fp.replace(/\.md$/i, ".preview.png")
      : `${fp}.preview.png`
  }
  return null
}
