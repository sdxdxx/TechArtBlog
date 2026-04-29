const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const slug = entry.target.id
    const tocEntryElements = document.querySelectorAll(`a[data-for="${slug}"]`)
    const windowHeight = entry.rootBounds?.height
    if (windowHeight && tocEntryElements.length > 0) {
      if (entry.boundingClientRect.y < windowHeight) {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.add("in-view"))
      } else {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.remove("in-view"))
      }
    }
  }
})

let activeTopScroll = 0
const topScrollCancelKeys = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Enter",
  "Home",
  "PageDown",
  "PageUp",
  " ",
])

function instantScrollTo(top: number) {
  const html = document.documentElement
  const previousScrollBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = "auto"
  window.scrollTo({ top, behavior: "auto" })
  html.style.scrollBehavior = previousScrollBehavior
}

function cancelTopScroll() {
  activeTopScroll++
}

window.addEventListener("wheel", cancelTopScroll, { passive: true })
window.addEventListener("pointerdown", cancelTopScroll, { passive: true })
window.addEventListener("touchstart", cancelTopScroll, { passive: true })
window.addEventListener("keydown", (event) => {
  if (topScrollCancelKeys.has(event.key)) {
    cancelTopScroll()
  }
})

function clearHash() {
  if (!window.location.hash) return

  const url = new URL(window.location.href)
  url.hash = ""
  window.history.replaceState({}, "", url)
}

function scrollToPageTop() {
  const token = ++activeTopScroll
  const start = window.scrollY
  const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const duration = shouldReduceMotion ? 0 : Math.min(800, Math.max(220, start / 4))

  const settle = (attempt = 0) => {
    if (token !== activeTopScroll) return

    if (window.scrollY > 2) {
      instantScrollTo(0)
    }

    if (attempt < 4) {
      window.setTimeout(() => settle(attempt + 1), 100 * Math.pow(2, attempt))
    }
  }

  if (duration === 0) {
    instantScrollTo(0)
    settle()
    return
  }

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  let startedAt: number | undefined

  const step = (timestamp: number) => {
    if (token !== activeTopScroll) return
    startedAt ??= timestamp

    const progress = Math.min(1, (timestamp - startedAt) / duration)
    const next = start * (1 - easeOutCubic(progress))
    instantScrollTo(next)

    if (progress < 1) {
      window.requestAnimationFrame(step)
    } else {
      settle()
    }
  }

  window.requestAnimationFrame(step)
}

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function handleTocHeaderClick(this: HTMLElement, e: Event) {
  const target = e.target as HTMLElement | null
  if (!target) return

  // 仅点击折叠箭头时执行收缩逻辑，保持原有动画行为。
  if (target.closest(".fold")) {
    toggleToc.call(this)
    return
  }

  // 点击标题文本（或按钮内其他区域）时回到页面顶部。
  e.preventDefault()
  window.dispatchEvent(new Event("quartz:cancel-anchor-scroll"))
  clearHash()
  scrollToPageTop()
}

function setupToc() {
  for (const toc of document.getElementsByClassName("toc")) {
    const button = toc.querySelector(".toc-header")
    const content = toc.querySelector(".toc-content")
    if (!button || !content) continue
    button.addEventListener("click", handleTocHeaderClick)
    window.addCleanup(() => button.removeEventListener("click", handleTocHeaderClick))
  }
}

document.addEventListener("nav", () => {
  setupToc()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
