const OVERLAY_ID = "qa-image-lightbox-overlay"
const PAN_EPSILON = 0.001

type LightboxState = {
  scale: number
  minScale: number
  maxScale: number
  offsetX: number
  offsetY: number
  dragging: boolean
  dragStartX: number
  dragStartY: number
  movedDuringDrag: boolean
  ignoreOverlayClick: boolean
}

type ImageMetrics = {
  baseWidth: number
  baseHeight: number
  baseCenterX: number
  baseCenterY: number
}

function createOverlay() {
  const existing = document.getElementById(OVERLAY_ID) as HTMLDivElement | null
  if (existing) return existing

  const overlay = document.createElement("div")
  overlay.id = OVERLAY_ID
  overlay.className = "qa-image-lightbox-overlay"
  overlay.innerHTML = `
    <button class="qa-image-lightbox-close" type="button" aria-label="Close image preview">X</button>
    <div class="qa-image-lightbox-stage">
      <img class="qa-image-lightbox-image" alt="" />
      <p class="qa-image-lightbox-caption"></p>
    </div>
  `

  document.body.appendChild(overlay)
  return overlay
}

function setupLightbox() {
  const overlay = createOverlay()
  const stage = overlay.querySelector(".qa-image-lightbox-stage") as HTMLDivElement | null
  const lightboxImage = overlay.querySelector(".qa-image-lightbox-image") as HTMLImageElement | null
  const closeButton = overlay.querySelector(".qa-image-lightbox-close") as HTMLButtonElement | null
  const caption = overlay.querySelector(".qa-image-lightbox-caption") as HTMLParagraphElement | null
  if (!stage || !lightboxImage || !closeButton || !caption) return

  const stageEl = stage
  const imageEl = lightboxImage
  const closeButtonEl = closeButton
  const captionEl = caption

  const state: LightboxState = {
    scale: 1,
    minScale: 1,
    maxScale: 8,
    offsetX: 0,
    offsetY: 0,
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    movedDuringDrag: false,
    ignoreOverlayClick: false,
  }

  function canPan(scale = state.scale) {
    return scale > state.minScale + PAN_EPSILON
  }

  function applyTransform() {
    imageEl.style.transform = `translate3d(${state.offsetX}px, ${state.offsetY}px, 0) scale(${state.scale})`
    imageEl.classList.toggle("pan-enabled", canPan())
  }

  function getImageMetrics(): ImageMetrics | null {
    const rect = imageEl.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) return null

    const safeScale = Math.max(state.scale, 0.000001)
    const baseWidth = rect.width / safeScale
    const baseHeight = rect.height / safeScale
    const currentCenterX = rect.left + rect.width / 2
    const currentCenterY = rect.top + rect.height / 2

    return {
      baseWidth,
      baseHeight,
      baseCenterX: currentCenterX - state.offsetX,
      baseCenterY: currentCenterY - state.offsetY,
    }
  }

  function computeOffsetBounds(scale = state.scale) {
    const metrics = getImageMetrics()
    if (!metrics) return null

    const overlayRect = overlay.getBoundingClientRect()
    const halfW = (metrics.baseWidth * scale) / 2
    const halfH = (metrics.baseHeight * scale) / 2

    // Keep at least one visible pixel in each axis.
    const minX = overlayRect.left + 1 - metrics.baseCenterX - halfW
    const maxX = overlayRect.right - 1 - metrics.baseCenterX + halfW
    const minY = overlayRect.top + 1 - metrics.baseCenterY - halfH
    const maxY = overlayRect.bottom - 1 - metrics.baseCenterY + halfH

    return { minX, maxX, minY, maxY }
  }

  function clampOffsets(scale = state.scale) {
    const bounds = computeOffsetBounds(scale)
    if (!bounds) return

    state.offsetX = Math.min(bounds.maxX, Math.max(bounds.minX, state.offsetX))
    state.offsetY = Math.min(bounds.maxY, Math.max(bounds.minY, state.offsetY))
  }

  function resetTransform() {
    state.scale = state.minScale
    state.offsetX = 0
    state.offsetY = 0
    state.dragging = false
    state.movedDuringDrag = false
    state.ignoreOverlayClick = false
    imageEl.classList.remove("dragging")
    applyTransform()
  }

  function currentImageCenter() {
    const rect = imageEl.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) {
      const stageRect = stageEl.getBoundingClientRect()
      return {
        x: stageRect.left + stageRect.width / 2,
        y: stageRect.top + stageRect.height / 2,
      }
    }
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }

  function zoomAt(clientX: number, clientY: number, factor: number) {
    const currentScale = state.scale
    const nextScale = Math.min(Math.max(currentScale * factor, state.minScale), state.maxScale)
    if (Math.abs(nextScale - currentScale) < 0.000001) return

    const metrics = getImageMetrics()
    if (!metrics) {
      state.scale = nextScale
      applyTransform()
      return
    }

    const ratio = nextScale / currentScale
    state.offsetX = ratio * state.offsetX + (1 - ratio) * (clientX - metrics.baseCenterX)
    state.offsetY = ratio * state.offsetY + (1 - ratio) * (clientY - metrics.baseCenterY)
    state.scale = nextScale

    if (!canPan(nextScale)) {
      state.offsetX = 0
      state.offsetY = 0
    } else {
      clampOffsets(nextScale)
    }

    applyTransform()
  }

  function openLightbox(src: string, alt: string) {
    imageEl.src = src
    imageEl.alt = alt
    captionEl.textContent = alt.trim().length > 0 ? alt : ""
    overlay.classList.add("active")
    document.documentElement.classList.add("qa-lightbox-open")
    document.body.classList.add("qa-lightbox-open")
    resetTransform()

    const onImageReady = () => {
      if (!overlay.classList.contains("active")) return
      resetTransform()
    }

    if (imageEl.complete) {
      onImageReady()
    } else {
      imageEl.addEventListener("load", onImageReady, { once: true })
    }
  }

  function closeLightbox() {
    overlay.classList.remove("active")
    document.documentElement.classList.remove("qa-lightbox-open")
    document.body.classList.remove("qa-lightbox-open")
    imageEl.removeAttribute("src")
  }

  function handleWheel(e: WheelEvent) {
    if (!overlay.classList.contains("active")) return
    e.preventDefault()

    const factor = Math.exp(-e.deltaY * 0.0015)
    zoomAt(e.clientX, e.clientY, factor)
  }

  function beginDrag(clientX: number, clientY: number) {
    if (!canPan()) return false

    state.dragging = true
    state.movedDuringDrag = false
    state.dragStartX = clientX - state.offsetX
    state.dragStartY = clientY - state.offsetY
    imageEl.classList.add("dragging")
    return true
  }

  function moveDrag(clientX: number, clientY: number) {
    const nextOffsetX = clientX - state.dragStartX
    const nextOffsetY = clientY - state.dragStartY

    if (
      Math.abs(nextOffsetX - state.offsetX) > 0.5 ||
      Math.abs(nextOffsetY - state.offsetY) > 0.5
    ) {
      state.movedDuringDrag = true
    }

    state.offsetX = nextOffsetX
    state.offsetY = nextOffsetY
    clampOffsets(state.scale)
    applyTransform()
  }

  function endDrag() {
    if (!state.dragging) return
    state.dragging = false
    imageEl.classList.remove("dragging")

    if (state.movedDuringDrag) {
      state.ignoreOverlayClick = true
    }
  }

  function handleMouseDown(e: MouseEvent) {
    if (!overlay.classList.contains("active")) return
    if (e.button !== 0) return
    if (!beginDrag(e.clientX, e.clientY)) return

    e.preventDefault()
  }

  function handleMouseMove(e: MouseEvent) {
    if (!state.dragging) return
    e.preventDefault()
    moveDrag(e.clientX, e.clientY)
  }

  function handleMouseUp() {
    endDrag()
  }

  function handleTouchStart(e: TouchEvent) {
    if (!overlay.classList.contains("active")) return
    const touch = e.touches[0]
    if (!touch) return
    if (!beginDrag(touch.clientX, touch.clientY)) return

    e.preventDefault()
  }

  function handleTouchMove(e: TouchEvent) {
    if (!state.dragging) return
    const touch = e.touches[0]
    if (!touch) return

    e.preventDefault()
    moveDrag(touch.clientX, touch.clientY)
  }

  function handleTouchEnd() {
    endDrag()
  }

  function preventNativeImageDrag(e: DragEvent) {
    e.preventDefault()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!overlay.classList.contains("active")) return

    if (e.key === "Escape") {
      e.preventDefault()
      closeLightbox()
      return
    }

    if (e.key === "+" || e.key === "=") {
      e.preventDefault()
      const center = currentImageCenter()
      zoomAt(center.x, center.y, 1.15)
      return
    }

    if (e.key === "-" || e.key === "_") {
      e.preventDefault()
      const center = currentImageCenter()
      zoomAt(center.x, center.y, 1 / 1.15)
      return
    }

    if (e.key === "0") {
      e.preventDefault()
      resetTransform()
    }
  }

  function handleOverlayClick(e: MouseEvent) {
    if (state.ignoreOverlayClick) {
      state.ignoreOverlayClick = false
      return
    }

    const target = e.target as HTMLElement
    if (target === overlay || target === closeButtonEl) {
      closeLightbox()
    }
  }

  function handleImageDoubleClick(e: MouseEvent) {
    e.preventDefault()

    if (canPan()) {
      resetTransform()
      return
    }

    zoomAt(e.clientX, e.clientY, 2)
  }

  function handleViewportResize() {
    if (!overlay.classList.contains("active")) return

    if (!canPan()) {
      state.offsetX = 0
      state.offsetY = 0
    } else {
      clampOffsets(state.scale)
    }
    applyTransform()
  }

  const candidateImages = Array.from(document.querySelectorAll(".center article img")) as HTMLImageElement[]
  const targetImages = candidateImages.filter((img) => {
    if (img.closest(".gallery-grid")) return false
    if (img.closest("a")) return false
    return true
  })

  for (const image of targetImages) {
    image.classList.add("qa-image-zoomable")
    const onClick = () => openLightbox(image.currentSrc || image.src, image.alt || "")
    image.addEventListener("click", onClick)
    window.addCleanup(() => image.removeEventListener("click", onClick))
  }

  overlay.addEventListener("click", handleOverlayClick)
  window.addCleanup(() => overlay.removeEventListener("click", handleOverlayClick))

  overlay.addEventListener("wheel", handleWheel, { passive: false })
  window.addCleanup(() => overlay.removeEventListener("wheel", handleWheel))

  imageEl.addEventListener("mousedown", handleMouseDown)
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("mouseup", handleMouseUp)
  imageEl.addEventListener("touchstart", handleTouchStart, { passive: false })
  window.addEventListener("touchmove", handleTouchMove, { passive: false })
  window.addEventListener("touchend", handleTouchEnd)
  window.addEventListener("touchcancel", handleTouchEnd)
  imageEl.addEventListener("dragstart", preventNativeImageDrag)
  window.addEventListener("resize", handleViewportResize)

  window.addCleanup(() => imageEl.removeEventListener("mousedown", handleMouseDown))
  window.addCleanup(() => window.removeEventListener("mousemove", handleMouseMove))
  window.addCleanup(() => window.removeEventListener("mouseup", handleMouseUp))
  window.addCleanup(() => imageEl.removeEventListener("touchstart", handleTouchStart))
  window.addCleanup(() => window.removeEventListener("touchmove", handleTouchMove))
  window.addCleanup(() => window.removeEventListener("touchend", handleTouchEnd))
  window.addCleanup(() => window.removeEventListener("touchcancel", handleTouchEnd))
  window.addCleanup(() => imageEl.removeEventListener("dragstart", preventNativeImageDrag))
  window.addCleanup(() => window.removeEventListener("resize", handleViewportResize))

  imageEl.addEventListener("dblclick", handleImageDoubleClick)
  window.addCleanup(() => imageEl.removeEventListener("dblclick", handleImageDoubleClick))

  closeButtonEl.addEventListener("click", closeLightbox)
  window.addCleanup(() => closeButtonEl.removeEventListener("click", closeLightbox))

  document.addEventListener("keydown", handleKeydown)
  window.addCleanup(() => document.removeEventListener("keydown", handleKeydown))

  window.addCleanup(() => {
    closeLightbox()
    for (const image of targetImages) {
      image.classList.remove("qa-image-zoomable")
    }
  })
}

document.addEventListener("nav", () => {
  setupLightbox()
})
