import { computePosition, flip, inline, shift } from "@floating-ui/dom"
import { normalizeRelativeURLs } from "../../util/path"
import { fetchCanonical } from "./util"

const p = new DOMParser()
let activeAnchor: HTMLAnchorElement | null = null
const galleryCoverCache = new Map<string, string | null>()

async function mouseEnterHandler(
  this: HTMLAnchorElement,
  { clientX, clientY }: { clientX: number; clientY: number },
) {
  const link = (activeAnchor = this)
  if (link.dataset.noPopover === "true") {
    return
  }

  async function setPosition(popoverElement: HTMLElement) {
    const { x, y } = await computePosition(link, popoverElement, {
      strategy: "fixed",
      middleware: [inline({ x: clientX, y: clientY }), shift(), flip()],
    })
    Object.assign(popoverElement.style, {
      transform: `translate(${x.toFixed()}px, ${y.toFixed()}px)`,
    })
  }

  function showPopover(popoverElement: HTMLElement) {
    clearActivePopover()
    popoverElement.classList.add("active-popover")
    setPosition(popoverElement as HTMLElement)

    if (hash !== "") {
      const targetAnchor = `#popover-internal-${hash.slice(1)}`
      const heading = popoverInner.querySelector(targetAnchor) as HTMLElement | null
      if (heading) {
        // leave ~12px of buffer when scrolling to a heading
        popoverInner.scroll({ top: heading.offsetTop - 12, behavior: "instant" })
      }
    }
  }

  const targetUrl = new URL(link.href)
  const hash = decodeURIComponent(targetUrl.hash)
  targetUrl.hash = ""
  targetUrl.search = ""
  const popoverId = `popover-${link.pathname}`
  const prevPopoverElement = document.getElementById(popoverId)

  // dont refetch if there's already a popover
  if (!!document.getElementById(popoverId)) {
    showPopover(prevPopoverElement as HTMLElement)
    return
  }

  const response = await fetchCanonical(targetUrl).catch((err) => {
    console.error(err)
  })

  if (!response) return
  const [contentType] = response.headers.get("Content-Type")!.split(";")
  const [contentTypeCategory, typeInfo] = contentType.split("/")

  const popoverElement = document.createElement("div")
  popoverElement.id = popoverId
  popoverElement.classList.add("popover")
  const popoverInner = document.createElement("div")
  popoverInner.classList.add("popover-inner")
  popoverInner.dataset.contentType = contentType ?? undefined
  popoverElement.appendChild(popoverInner)

  switch (contentTypeCategory) {
    case "image":
      const img = document.createElement("img")
      img.src = targetUrl.toString()
      img.alt = targetUrl.pathname

      popoverInner.appendChild(img)
      break
    case "application":
      switch (typeInfo) {
        case "pdf":
          const pdf = document.createElement("iframe")
          pdf.src = targetUrl.toString()
          popoverInner.appendChild(pdf)
          break
        default:
          break
      }
      break
    default:
      const contents = await response.text()
      const html = p.parseFromString(contents, "text/html")
      normalizeRelativeURLs(html, targetUrl)
      // prepend all IDs inside popovers to prevent duplicates
      html.querySelectorAll("[id]").forEach((el) => {
        const targetID = `popover-internal-${el.id}`
        el.id = targetID
      })
      const elts = [...html.getElementsByClassName("popover-hint")]
      if (elts.length === 0) return

      elts.forEach((elt) => popoverInner.appendChild(elt))
  }

  if (!!document.getElementById(popoverId)) {
    return
  }

  document.body.appendChild(popoverElement)
  if (activeAnchor !== this) {
    return
  }

  showPopover(popoverElement)
}

function clearActivePopover() {
  activeAnchor = null
  const allPopoverElements = document.querySelectorAll(".popover")
  allPopoverElements.forEach((popoverElement) => popoverElement.classList.remove("active-popover"))
}

function parseCardTitleFromSlug(link: HTMLAnchorElement): string {
  const rawSlug = link.dataset.slug ?? link.getAttribute("href") ?? ""
  const slugWithoutHash = rawSlug.split("#")[0]?.split("?")[0] ?? ""
  const lastSegment = slugWithoutHash.split("/").filter(Boolean).at(-1) ?? ""

  try {
    return decodeURIComponent(lastSegment).replaceAll(/[-_]/g, " ").trim()
  } catch {
    return lastSegment.replaceAll(/[-_]/g, " ").trim()
  }
}

function isEmptyInlineCoverSrc(src: string): boolean {
  const normalized = src.trim()
  return normalized.length === 0 || normalized === "." || normalized === "./" || normalized === "#"
}

async function resolveGalleryCoverFromTarget(link: HTMLAnchorElement): Promise<string | null> {
  const targetUrl = new URL(link.href)
  targetUrl.hash = ""
  targetUrl.search = ""
  const cacheKey = targetUrl.toString()

  if (galleryCoverCache.has(cacheKey)) {
    return galleryCoverCache.get(cacheKey) ?? null
  }

  try {
    const response = await fetchCanonical(targetUrl)
    const [contentType] = response.headers.get("Content-Type")?.split(";") ?? [""]
    if (!contentType.startsWith("text/html")) {
      galleryCoverCache.set(cacheKey, null)
      return null
    }

    const html = p.parseFromString(await response.text(), "text/html")
    normalizeRelativeURLs(html, targetUrl)

    const firstImage = html.querySelector(
      ".center article img[src], article img[src]",
    ) as HTMLImageElement | null
    const firstImageSrc = firstImage?.getAttribute("src")?.trim() ?? ""
    if (!firstImageSrc) {
      galleryCoverCache.set(cacheKey, null)
      return null
    }

    const resolvedSrc = new URL(firstImageSrc, targetUrl).toString()
    galleryCoverCache.set(cacheKey, resolvedSrc)
    return resolvedSrc
  } catch (err) {
    console.error(err)
    galleryCoverCache.set(cacheKey, null)
    return null
  }
}

async function applyGalleryCover(link: HTMLAnchorElement) {
  let img = link.querySelector("img")
  const inlineSrc = img?.getAttribute("src")?.trim() ?? ""

  // Keep manually configured cover image; if it 404s, retain Quartz default behavior.
  if (!isEmptyInlineCoverSrc(inlineSrc)) {
    link.classList.remove("gallery-card-placeholder")
    link.querySelector(".gallery-cover-placeholder")?.remove()
    return
  }

  const fallbackCover = await resolveGalleryCoverFromTarget(link)
  if (fallbackCover) {
    if (!img) {
      img = document.createElement("img")
      link.prepend(img)
    }
    img.setAttribute("src", fallbackCover)
    link.classList.remove("gallery-card-placeholder")
    link.querySelector(".gallery-cover-placeholder")?.remove()
    return
  }

  // no inline cover and no target-page cover: render gray placeholder square
  img?.remove()
  if (!link.querySelector(".gallery-cover-placeholder")) {
    const placeholder = document.createElement("span")
    placeholder.className = "gallery-cover-placeholder"
    placeholder.setAttribute("aria-hidden", "true")
    link.prepend(placeholder)
  }
  link.classList.add("gallery-card-placeholder")
}

async function setupGalleryCards() {
  const galleryLinks = [
    ...document.querySelectorAll(".gallery-grid a.internal"),
  ] as HTMLAnchorElement[]

  for (const link of galleryLinks) {
    // Gallery cards keep Quartz popovers, while also adding ArtStation-like title overlays.
    link.removeAttribute("data-no-popover")

    if (!link.dataset.cardTitle) {
      const imageAlt = link.querySelector("img")?.getAttribute("alt")?.trim() ?? ""
      const parsedTitle = parseCardTitleFromSlug(link)
      link.dataset.cardTitle = imageAlt.length > 0 ? imageAlt : parsedTitle
    }

    await applyGalleryCover(link)
  }
}

function setupTextContentNoPopover() {
  const articleLinks = [
    ...document.querySelectorAll(".center article a.internal"),
  ] as HTMLAnchorElement[]

  for (const link of articleLinks) {
    if (link.closest(".gallery-grid")) {
      continue
    }

    // Disable popovers for in-article text links to reduce reading distractions.
    link.dataset.noPopover = "true"
  }
}

document.addEventListener("nav", () => {
  void setupGalleryCards()
  setupTextContentNoPopover()

  const links = [...document.querySelectorAll("a.internal")] as HTMLAnchorElement[]
  for (const link of links) {
    link.addEventListener("mouseenter", mouseEnterHandler)
    link.addEventListener("mouseleave", clearActivePopover)
    window.addCleanup(() => {
      link.removeEventListener("mouseenter", mouseEnterHandler)
      link.removeEventListener("mouseleave", clearActivePopover)
    })
  }
})
