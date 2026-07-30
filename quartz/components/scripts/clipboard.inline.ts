const svgCopy =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>'
const svgCheck =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>'

function legacyCopy(source: string): boolean {
  const textarea = document.createElement("textarea")
  textarea.value = source
  textarea.readOnly = true
  textarea.setAttribute("aria-hidden", "true")
  Object.assign(textarea.style, {
    position: "fixed",
    left: "-9999px",
    top: "0",
    opacity: "0",
    fontSize: "16px",
  })
  document.body.append(textarea)
  textarea.select()
  textarea.setSelectionRange(0, source.length)
  let copied = false
  try {
    copied = document.execCommand("copy")
  } finally {
    textarea.remove()
  }
  return copied
}

async function copySource(source: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(source)
      return
    } catch {
      // Some mobile WebViews expose the API but reject writes.
    }
  }
  if (!legacyCopy(source)) throw new Error("Clipboard API is unavailable")
}

function setupClipboard() {
  const els = document.getElementsByTagName("pre")
  for (let i = 0; i < els.length; i++) {
    const codeBlock = els[i].getElementsByTagName("code")[0]
    const frame = els[i].closest(".xdcr-code-frame")
    if (
      codeBlock &&
      !frame?.querySelector(".clipboard-button") &&
      !els[i].querySelector(".clipboard-button")
    ) {
      const button = document.createElement("button")
      button.className = "clipboard-button"
      button.type = "button"
      button.innerHTML = svgCopy
      button.ariaLabel = "Copy source"
      const actions = frame?.querySelector(".xdcr-code-actions")
      if (actions) actions.append(button)
      else els[i].prepend(button)
    }
  }
}

document.addEventListener("nav", setupClipboard)
queueMicrotask(setupClipboard)

document.addEventListener("click", (event) => {
  const target = event.target
  if (!(target instanceof Element)) return
  const button = target.closest<HTMLButtonElement>(".clipboard-button")
  if (!button) return
  const frame = button.closest(".xdcr-code-frame")
  const codeBlock =
    frame?.querySelector<HTMLElement>("pre > code") ??
    button.closest("pre")?.querySelector<HTMLElement>("code")
  if (!codeBlock) return
  const source = (
    codeBlock.dataset.clipboard ? JSON.parse(codeBlock.dataset.clipboard) : codeBlock.innerText
  ).replace(/\n\n/g, "\n")
  copySource(source).then(
    () => {
      button.blur()
      button.innerHTML = svgCheck
      setTimeout(() => {
        button.innerHTML = svgCopy
      }, 2000)
    },
    (error) => console.error(error),
  )
})
