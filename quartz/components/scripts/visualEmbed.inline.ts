type CanvasNode = {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  text?: string
  file?: string
  url?: string
  label?: string
  color?: string
}

type CanvasEdge = {
  fromNode: string
  toNode: string
  toEnd?: string
  color?: string
}

type CanvasDocument = {
  nodes?: CanvasNode[]
  edges?: CanvasEdge[]
}

const svgNamespace = "http://www.w3.org/2000/svg"
const xhtmlNamespace = "http://www.w3.org/1999/xhtml"
const canvasColors: Record<string, string> = {
  "1": "#ef4444",
  "2": "#f97316",
  "3": "#eab308",
  "4": "#22c55e",
  "5": "#06b6d4",
  "6": "#8b5cf6",
}

function svgElement<K extends keyof SVGElementTagNameMap>(name: K): SVGElementTagNameMap[K] {
  return document.createElementNS(svgNamespace, name)
}

function canvasBounds(nodes: CanvasNode[]) {
  if (nodes.length === 0) return { minX: 0, minY: 0, width: 800, height: 500 }
  const minX = Math.min(...nodes.map((node) => node.x))
  const minY = Math.min(...nodes.map((node) => node.y))
  const maxX = Math.max(...nodes.map((node) => node.x + node.width))
  const maxY = Math.max(...nodes.map((node) => node.y + node.height))
  return { minX, minY, width: Math.max(1, maxX - minX), height: Math.max(1, maxY - minY) }
}

function slugifyAssetPath(value: string): string {
  return value
    .split("/")
    .map((segment) =>
      segment
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/[?#]/g, ""),
    )
    .join("/")
}

function addCanvasDefinitions(svg: SVGSVGElement) {
  const definitions = svgElement("defs")
  const pattern = svgElement("pattern")
  pattern.id = `canvas-dots-${Math.random().toString(36).slice(2)}`
  pattern.setAttribute("width", "24")
  pattern.setAttribute("height", "24")
  pattern.setAttribute("patternUnits", "userSpaceOnUse")
  const dot = svgElement("circle")
  dot.setAttribute("cx", "1")
  dot.setAttribute("cy", "1")
  dot.setAttribute("r", "1")
  dot.setAttribute("fill", "currentColor")
  dot.setAttribute("opacity", "0.35")
  pattern.append(dot)

  const marker = svgElement("marker")
  marker.id = `canvas-arrow-${Math.random().toString(36).slice(2)}`
  marker.setAttribute("viewBox", "0 0 10 10")
  marker.setAttribute("refX", "9")
  marker.setAttribute("refY", "5")
  marker.setAttribute("markerWidth", "6")
  marker.setAttribute("markerHeight", "6")
  marker.setAttribute("orient", "auto-start-reverse")
  const arrow = svgElement("path")
  arrow.setAttribute("d", "M 0 0 L 10 5 L 0 10 z")
  arrow.setAttribute("fill", "context-stroke")
  marker.append(arrow)
  definitions.append(pattern, marker)
  svg.append(definitions)
  return { patternId: pattern.id, markerId: marker.id }
}

function appendCanvasNode(svg: SVGSVGElement, node: CanvasNode, siteRoot: URL) {
  const group = svgElement("g")
  const rect = svgElement("rect")
  rect.setAttribute("x", String(node.x))
  rect.setAttribute("y", String(node.y))
  rect.setAttribute("width", String(Math.max(1, node.width)))
  rect.setAttribute("height", String(Math.max(1, node.height)))
  rect.setAttribute("rx", "8")
  rect.setAttribute("fill", node.type === "group" ? "none" : "var(--light)")
  rect.setAttribute("fill-opacity", node.type === "group" ? "0" : "0.96")
  rect.setAttribute("stroke", canvasColors[node.color ?? ""] ?? node.color ?? "var(--gray)")
  rect.setAttribute("stroke-width", node.type === "group" ? "1" : "2")
  if (node.type === "group") rect.setAttribute("stroke-dasharray", "8 6")
  group.append(rect)

  const contentX = node.x + 12
  const contentY = node.y + 12
  const contentWidth = Math.max(1, node.width - 24)
  const contentHeight = Math.max(1, node.height - 24)
  const isImage =
    node.type === "file" && Boolean(node.file?.match(/\.(png|jpe?g|gif|webp|svg|bmp)$/i))
  if (isImage && node.file) {
    const image = svgElement("image")
    image.setAttribute("x", String(contentX))
    image.setAttribute("y", String(contentY))
    image.setAttribute("width", String(contentWidth))
    image.setAttribute("height", String(contentHeight))
    image.setAttribute("preserveAspectRatio", "xMidYMid meet")
    image.setAttribute("href", new URL(slugifyAssetPath(node.file), siteRoot).href)
    group.append(image)
  } else {
    const foreignObject = svgElement("foreignObject")
    foreignObject.setAttribute("x", String(contentX))
    foreignObject.setAttribute("y", String(contentY))
    foreignObject.setAttribute("width", String(contentWidth))
    foreignObject.setAttribute("height", String(contentHeight))
    const text = document.createElementNS(xhtmlNamespace, "div")
    text.setAttribute("class", "canvas-node-text")
    text.textContent = node.text ?? node.label ?? node.file ?? node.url ?? ""
    foreignObject.append(text)
    group.append(foreignObject)
  }
  svg.append(group)
}

function renderCanvas(container: HTMLElement, canvas: CanvasDocument, siteRoot: URL) {
  const nodes = Array.isArray(canvas.nodes) ? canvas.nodes : []
  const edges = Array.isArray(canvas.edges) ? canvas.edges : []
  const bounds = canvasBounds(nodes)
  const padding = 48
  const svg = svgElement("svg")
  svg.classList.add("visual-embed__canvas")
  svg.setAttribute(
    "viewBox",
    `${bounds.minX - padding} ${bounds.minY - padding} ${bounds.width + padding * 2} ${bounds.height + padding * 2}`,
  )
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
  const { patternId, markerId } = addCanvasDefinitions(svg)
  const background = svgElement("rect")
  background.setAttribute("x", String(bounds.minX - padding))
  background.setAttribute("y", String(bounds.minY - padding))
  background.setAttribute("width", String(bounds.width + padding * 2))
  background.setAttribute("height", String(bounds.height + padding * 2))
  background.setAttribute("fill", `url(#${patternId})`)
  background.setAttribute("color", "var(--gray)")
  svg.append(background)

  const nodesById = new Map(nodes.map((node) => [node.id, node]))
  for (const edge of edges) {
    const from = nodesById.get(edge.fromNode)
    const to = nodesById.get(edge.toNode)
    if (!from || !to) continue
    const line = svgElement("line")
    line.setAttribute("x1", String(from.x + from.width / 2))
    line.setAttribute("y1", String(from.y + from.height / 2))
    line.setAttribute("x2", String(to.x + to.width / 2))
    line.setAttribute("y2", String(to.y + to.height / 2))
    line.setAttribute("stroke", canvasColors[edge.color ?? ""] ?? edge.color ?? "var(--gray)")
    line.setAttribute("stroke-width", "2")
    if (edge.toEnd !== "none") line.setAttribute("marker-end", `url(#${markerId})`)
    svg.append(line)
  }

  for (const node of nodes) appendCanvasNode(svg, node, siteRoot)
  container.replaceChildren(svg)
  container.hidden = false
}

function showUnavailable(container: HTMLElement, label: string) {
  const message = document.createElement("div")
  message.className = "visual-embed__message"
  message.textContent = `${label} preview unavailable`
  container.replaceChildren(message)
  container.hidden = false
}

async function useVisualFallback(figure: HTMLElement) {
  const preview = figure.querySelector<HTMLElement>(".visual-embed__preview")
  const fallback = figure.querySelector<HTMLElement>(".visual-embed__fallback")
  if (!fallback || fallback.dataset.loading === "true") return
  fallback.dataset.loading = "true"
  preview?.setAttribute("hidden", "")
  const kind = figure.dataset.visualKind
  if (kind !== "canvas") {
    showUnavailable(fallback, "Excalidraw")
    return
  }

  const source = figure.querySelector<HTMLAnchorElement>(".visual-embed__source")
  if (!source) {
    showUnavailable(fallback, "Canvas")
    return
  }

  try {
    const response = await fetch(source.href)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const canvas = (await response.json()) as CanvasDocument
    const root = figure.dataset.siteRoot ?? "."
    renderCanvas(fallback, canvas, new URL(`${root}/`, window.location.href))
  } catch (error) {
    console.error("Unable to render Canvas fallback", error)
    showUnavailable(fallback, "Canvas")
  }
}

function setupVisualEmbeds() {
  for (const figure of document.querySelectorAll<HTMLElement>(".visual-embed")) {
    if (figure.dataset.visualReady === "true") continue
    figure.dataset.visualReady = "true"
    const image = figure.querySelector<HTMLImageElement>(".visual-embed__preview img")
    if (!image) {
      void useVisualFallback(figure)
      continue
    }
    image.addEventListener("error", () => void useVisualFallback(figure), { once: true })
    if (image.complete && image.naturalWidth === 0) void useVisualFallback(figure)
  }
}

document.addEventListener("nav", setupVisualEmbeds)
