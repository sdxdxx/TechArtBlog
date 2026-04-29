"use strict";

const { Plugin, MarkdownView, PluginSettingTab, Setting } = require("obsidian");

const HOST_CLASS = "attachment-alias-caption-host";
const TEXT_CLASS = "attachment-alias-caption-text";
const PARAGRAPH_CLASS = "attachment-alias-caption-paragraph";
const GENERATED_ATTR = "data-attachment-alias-caption-generated";
const WIDTH_ATTR = "data-attachment-alias-caption-width";
const ORIGINAL_STYLE_ATTR_PREFIX = "data-attachment-alias-caption-original-style-";
const COLOR_VARIABLE = "--attachment-alias-caption-color";
const OPACITY_VARIABLE = "--attachment-alias-caption-opacity";
const FALLBACK_CAPTION_COLOR = "#8a8a8a";
const DEFAULT_SETTINGS = {
  captionColor: "",
  captionAlpha: 1
};
const MEDIA_ELEMENT_SELECTOR = "img, video, iframe, embed, object, webview";
const EMBED_ROOT_SELECTOR = [
  ".internal-embed",
  ".external-embed",
  ".media-embed",
  ".image-embed",
  ".video-embed"
].join(", ");

const IMAGE_EXTENSIONS = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "avif",
  "svg",
  "bmp",
  "ico",
  "tif",
  "tiff",
  "heic",
  "heif"
]);

const VIDEO_EXTENSIONS = new Set([
  "mp4",
  "m4v",
  "mov",
  "webm",
  "mkv",
  "avi",
  "flv",
  "wmv",
  "mpeg",
  "mpg",
  "m3u8"
]);

function clampCaptionAlpha(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return DEFAULT_SETTINGS.captionAlpha;
  }

  return Math.min(1, Math.max(0, number));
}

function normalizeHexColor(value) {
  const text = String(value ?? "").trim().toLowerCase();
  const shortMatch = /^#([0-9a-f]{3})$/i.exec(text);
  if (shortMatch) {
    return `#${shortMatch[1].split("").map((char) => char + char).join("")}`;
  }

  return /^#[0-9a-f]{6}$/i.test(text) ? text : "";
}

function normalizeSettings(settings) {
  return {
    captionColor: normalizeHexColor(settings?.captionColor) || DEFAULT_SETTINGS.captionColor,
    captionAlpha: clampCaptionAlpha(settings?.captionAlpha ?? DEFAULT_SETTINGS.captionAlpha)
  };
}

function formatAlpha(value) {
  return `${Math.round(clampCaptionAlpha(value) * 100)}%`;
}

function splitUnescapedPipes(text) {
  const parts = [];
  let current = "";
  let escaped = false;

  for (const char of String(text ?? "")) {
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }

    if (char === "\\") {
      current += char;
      escaped = true;
      continue;
    }

    if (char === "|") {
      parts.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  parts.push(current);
  return parts;
}

function normalizeText(text) {
  return String(text ?? "")
    .replace(/\\([\\|[\]()])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeNumberToken(text) {
  return String(text ?? "")
    .replace(/[\uFF10-\uFF19]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\u00D7/g, "x")
    .trim()
    .toLowerCase();
}

function isSizeToken(text) {
  return /^\d+(?:\s*x\s*\d+)?(?:\s*px)?$/.test(normalizeNumberToken(text));
}

function isUrlToken(text) {
  return /^(https?:)?\/\//i.test(String(text ?? "").trim());
}

function basenameOf(text) {
  const normalized = String(text ?? "").replace(/\\/g, "/");
  const segments = normalized.split("/");
  return segments[segments.length - 1] ?? normalized;
}

function decodeUriComponentSafely(value) {
  let current = String(value ?? "");

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) {
        break;
      }

      current = decoded;
    } catch {
      break;
    }
  }

  return current;
}

function getFileExtension(target) {
  const clean = String(target ?? "")
    .split("#")[0]
    .split("?")[0]
    .trim();
  const match = /\.([a-z0-9]+)$/i.exec(clean);
  return match ? match[1].toLowerCase() : "";
}

function isSupportedInternalTarget(target) {
  const extension = getFileExtension(target);
  return IMAGE_EXTENSIONS.has(extension) || VIDEO_EXTENSIONS.has(extension);
}

function hasSinglePayloadToken(parts, startIndex) {
  return parts.slice(startIndex).length === 1;
}

function findWidthTokenIndex(parts, startIndex, options = {}) {
  const singleSizeTokenIsWidth = options.singleSizeTokenIsWidth !== false;
  const isSinglePayload = hasSinglePayloadToken(parts, startIndex);

  if (!singleSizeTokenIsWidth && isSinglePayload) {
    return -1;
  }

  for (let index = parts.length - 1; index >= startIndex; index -= 1) {
    const candidate = normalizeText(parts[index]);
    if (candidate && isSizeToken(candidate)) {
      return index;
    }
  }

  return -1;
}

function extractCaption(parts, startIndex, options = {}) {
  const singleSizeTokenIsCaption = options.singleSizeTokenIsCaption === true;
  const isSinglePayload = hasSinglePayloadToken(parts, startIndex);
  const widthIndex = findWidthTokenIndex(parts, startIndex, options);

  for (let index = parts.length - 1; index >= startIndex; index -= 1) {
    const candidate = normalizeText(parts[index]);
    if (!candidate || isUrlToken(candidate)) {
      continue;
    }

    if (index === widthIndex && !(singleSizeTokenIsCaption && isSinglePayload)) {
      continue;
    }

    return candidate;
  }

  return "";
}

function extractWidth(parts, startIndex, options = {}) {
  const widthIndex = findWidthTokenIndex(parts, startIndex, options);
  if (widthIndex === -1) {
    return 0;
  }

  const match = /^(\d+)/.exec(normalizeNumberToken(parts[widthIndex]));
  if (match?.[1]) {
    return Number.parseInt(match[1], 10);
  }

  return 0;
}

function extractMarkdownUrl(inside) {
  const trimmed = String(inside ?? "").trim();
  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("<")) {
    const endIndex = trimmed.indexOf(">");
    if (endIndex !== -1) {
      return trimmed.slice(1, endIndex).trim();
    }
  }

  const match = /^(\S+)/.exec(trimmed);
  return match ? match[1] : trimmed;
}

function isYouTubeUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");

    return (
      host === "youtu.be" ||
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    );
  } catch {
    return false;
  }
}

function normalizeExternalKey(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) {
    return "";
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    return trimmed;
  }
}

function normalizeInternalKey(value) {
  const trimmed = String(value ?? "").trim().replace(/\\/g, "/");
  if (!trimmed) {
    return "";
  }

  const clean = trimmed.split("#")[0].split("?")[0];
  return basenameOf(decodeUriComponentSafely(clean)).toLowerCase();
}

function isLocalMarkdownUrl(value) {
  const trimmed = String(value ?? "").trim();
  return !!trimmed && !/^[a-z][a-z0-9+.-]*:/i.test(trimmed) && !trimmed.startsWith("//");
}

function isExternalVideoUrl(value) {
  return isYouTubeUrl(value) || VIDEO_EXTENSIONS.has(getFileExtension(value));
}

function makeKeyCandidates(...values) {
  const keys = new Set();
  for (const value of values) {
    const text = String(value ?? "").trim();
    if (!text) {
      continue;
    }

    const decoded = decodeUriComponentSafely(text);
    for (const candidate of [text, decoded]) {
      const externalKey = normalizeExternalKey(candidate);
      const internalKey = normalizeInternalKey(candidate);
      if (externalKey) {
        keys.add(externalKey);
      }
      if (internalKey) {
        keys.add(internalKey);
      }
    }
  }

  return keys;
}

function parseInternalEmbed(markdown) {
  const parts = splitUnescapedPipes(markdown);
  const target = normalizeText(parts[0] ?? "");

  if (!target || !isSupportedInternalTarget(target)) {
    return null;
  }

  return {
    type: "internal",
    caption: extractCaption(parts, 1),
    key: normalizeInternalKey(target),
    keys: makeKeyCandidates(target),
    width: extractWidth(parts, 1)
  };
}

function parseExternalEmbed(altText, urlText) {
  const url = extractMarkdownUrl(urlText);
  if (!url || isExternalVideoUrl(url)) {
    return null;
  }

  const parts = splitUnescapedPipes(altText);
  return {
    type: "external",
    caption: extractCaption(parts, 0, { singleSizeTokenIsCaption: true }),
    key: normalizeExternalKey(url),
    keys: makeKeyCandidates(url),
    allowInternalRoot: isLocalMarkdownUrl(url),
    url,
    width: extractWidth(parts, 0, { singleSizeTokenIsWidth: false })
  };
}

function readExternalEmbed(text, startIndex) {
  const altEnd = text.indexOf("](", startIndex + 2);
  if (altEnd === -1) {
    return null;
  }

  let depth = 1;
  let quote = null;
  let index = altEnd + 2;

  while (index < text.length) {
    const char = text[index];

    if (quote) {
      if (char === quote && text[index - 1] !== "\\") {
        quote = null;
      }
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === "(") {
      depth += 1;
    } else if (char === ")") {
      depth -= 1;
      if (depth === 0) {
        return {
          endIndex: index + 1,
          token: parseExternalEmbed(
            text.slice(startIndex + 2, altEnd),
            text.slice(altEnd + 2, index)
          )
        };
      }
    }

    index += 1;
  }

  return null;
}

function parseSourceTokens(source) {
  const tokens = [];
  let index = 0;

  while (index < source.length) {
    if (source.startsWith("![[", index)) {
      const endIndex = source.indexOf("]]", index + 3);
      if (endIndex === -1) {
        index += 3;
        continue;
      }

      const token = parseInternalEmbed(source.slice(index + 3, endIndex));
      if (token) {
        tokens.push(token);
      }

      index = endIndex + 2;
      continue;
    }

    if (source.startsWith("![", index)) {
      const parsed = readExternalEmbed(source, index);
      if (!parsed) {
        index += 2;
        continue;
      }

      if (parsed.token) {
        tokens.push(parsed.token);
      }
      index = parsed.endIndex;
      continue;
    }

    index += 1;
  }

  return tokens;
}
function isVisible(element) {
  return element instanceof HTMLElement && element.getClientRects().length > 0;
}

function containsMedia(element) {
  return !!element.matches?.(MEDIA_ELEMENT_SELECTOR) || !!element.querySelector(MEDIA_ELEMENT_SELECTOR);
}

function findMediaElement(root) {
  if (root.matches?.(MEDIA_ELEMENT_SELECTOR)) {
    return root;
  }

  return root.querySelector(MEDIA_ELEMENT_SELECTOR);
}

function findPreferredMediaRoot(root) {
  let current = root;

  for (let depth = 0; depth < 4; depth += 1) {
    const parent = current?.parentElement;
    if (!parent) {
      break;
    }

    if (parent.matches?.(EMBED_ROOT_SELECTOR)) {
      return parent;
    }

    if (parent.matches?.("a[href], [data-href], [data-url]")) {
      return parent;
    }

    current = parent;
  }

  return root;
}

function getRootType(root) {
  if (root.classList?.contains("internal-embed")) {
    return "internal";
  }

  return "external";
}

function sortByDocumentOrder(elements) {
  return elements.sort((left, right) => {
    if (left === right) {
      return 0;
    }

    return left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });
}

function rootKeyCandidates(root) {
  const values = new Set();
  const addValue = (value) => {
    const text = String(value ?? "").trim();
    if (!text) {
      return;
    }

    values.add(text);
  };

  addValue(root.getAttribute?.("src"));
  addValue(root.getAttribute?.("data-path"));
  addValue(root.getAttribute?.("href"));
  addValue(root.getAttribute?.("data-href"));
  addValue(root.getAttribute?.("data-url"));
  addValue(root.getAttribute?.("srcdoc"));

  const media = findMediaElement(root);
  if (media) {
    addValue(media.getAttribute?.("src"));
    addValue(media.getAttribute?.("data-src"));
    addValue(media.getAttribute?.("data-href"));
    addValue(media.getAttribute?.("data-url"));
    addValue(media.getAttribute?.("srcdoc"));
    addValue(media.currentSrc);
    addValue(media.getAttribute?.("poster"));
  }

  for (const linked of Array.from(root.querySelectorAll?.("a[href], iframe[src], webview[src], [data-href], [data-url]") || []).slice(0, 8)) {
    addValue(linked.getAttribute?.("href"));
    addValue(linked.getAttribute?.("src"));
    addValue(linked.getAttribute?.("data-href"));
    addValue(linked.getAttribute?.("data-url"));
    addValue(linked.getAttribute?.("srcdoc"));
  }

  const candidates = new Set();
  for (const value of values) {
    for (const candidate of makeKeyCandidates(value)) {
      candidates.add(candidate);
    }
  }

  return candidates;
}

function collectRenderedMediaRoots(container) {
  const wrappedRoots = Array.from(
    container.querySelectorAll(EMBED_ROOT_SELECTOR)
  ).filter((root) => containsMedia(root) && isVisible(root));

  const bareRoots = Array.from(
    container.querySelectorAll(MEDIA_ELEMENT_SELECTOR)
  ).filter((root) => {
    if (!isVisible(root)) {
      return false;
    }

    if (root.classList.contains("emoji")) {
      return false;
    }

    return !root.closest(EMBED_ROOT_SELECTOR);
  });

  const dedupedBareRoots = [];
  const seen = new Set();
  for (const root of bareRoots) {
    const preferredRoot = findPreferredMediaRoot(root);
    if (seen.has(preferredRoot)) {
      continue;
    }

    seen.add(preferredRoot);
    dedupedBareRoots.push(preferredRoot);
  }

  return sortByDocumentOrder(wrappedRoots.concat(dedupedBareRoots)).map((root) => ({
    root,
    type: getRootType(root),
    keys: rootKeyCandidates(root)
  }));
}

function paragraphHasOnlyHost(paragraph, host) {
  for (const node of Array.from(paragraph.childNodes)) {
    if (node === host) {
      continue;
    }

    if (node.nodeType === Node.TEXT_NODE && !String(node.textContent ?? "").trim()) {
      continue;
    }

    return false;
  }

  return true;
}

function ensureHost(root) {
  if (root.matches?.(EMBED_ROOT_SELECTOR) && !root.matches?.(MEDIA_ELEMENT_SELECTOR)) {
    root.classList.add(HOST_CLASS);
    const parent = root.parentElement;
    if (parent?.tagName === "P" && paragraphHasOnlyHost(parent, root)) {
      parent.classList.add(PARAGRAPH_CLASS);
    }
    return root;
  }

  const parent = root.parentElement;
  if (!parent) {
    return null;
  }

  if (parent.classList.contains(HOST_CLASS) && parent.getAttribute(GENERATED_ATTR) === "true") {
    return parent;
  }

  const host = document.createElement(parent.tagName === "P" ? "span" : "div");
  host.className = HOST_CLASS;
  host.setAttribute(GENERATED_ATTR, "true");
  parent.insertBefore(host, root);
  host.appendChild(root);

  if (parent.tagName === "P" && paragraphHasOnlyHost(parent, host)) {
    parent.classList.add(PARAGRAPH_CLASS);
  }

  return host;
}

function originalStyleAttrName(property) {
  return `${ORIGINAL_STYLE_ATTR_PREFIX}${property.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`;
}

function cssPropertyName(property) {
  return property.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

function setGeneratedWidthStyle(element, property, value) {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  const originalAttr = originalStyleAttrName(property);
  if (!element.hasAttribute(originalAttr)) {
    element.setAttribute(originalAttr, element.style[property] ?? "");
  }

  element.style.setProperty(cssPropertyName(property), value, "important");
  element.setAttribute(WIDTH_ATTR, "true");
}

function clearGeneratedWidths(container) {
  const styleProperties = ["width", "maxWidth", "height"];

  for (const element of Array.from(container.querySelectorAll(`[${WIDTH_ATTR}]`))) {
    for (const property of styleProperties) {
      const originalAttr = originalStyleAttrName(property);
      if (!element.hasAttribute(originalAttr)) {
        continue;
      }

      element.style[property] = element.getAttribute(originalAttr) ?? "";
      element.removeAttribute(originalAttr);
    }

    element.removeAttribute(WIDTH_ATTR);
  }
}

function applyMediaWidth(root, width) {
  const numericWidth = Number.parseInt(width, 10);
  if (!Number.isFinite(numericWidth) || numericWidth <= 0) {
    return;
  }

  const host = ensureHost(root);
  if (!host) {
    return;
  }

  const widthValue = `${numericWidth}px`;

  const media = findMediaElement(host);
  const targets = [host];
  if (media instanceof HTMLElement) {
    let current = media;
    while (current && current !== host) {
      targets.push(current);
      current = current.parentElement;
    }
  }

  for (const target of targets) {
    setGeneratedWidthStyle(target, "width", widthValue);
    setGeneratedWidthStyle(target, "maxWidth", "none");
  }

  if (!media) {
    return;
  }

  if (media.matches?.("img, video")) {
    setGeneratedWidthStyle(media, "height", "auto");
  }
}

function clearExistingCaptions(container) {
  clearGeneratedWidths(container);

  for (const caption of Array.from(container.querySelectorAll(`.${TEXT_CLASS}`))) {
    caption.remove();
  }

  for (const block of Array.from(document.querySelectorAll(".attachment-alias-caption-source-youtube-fallback[data-attachment-alias-caption-generated='true']"))) {
    block.remove();
  }

  for (const host of Array.from(container.querySelectorAll(`.${HOST_CLASS}[${GENERATED_ATTR}="true"]`))) {
    const parent = host.parentElement;
    if (!parent) {
      continue;
    }

    const children = Array.from(host.childNodes);
    for (const child of children) {
      parent.insertBefore(child, host);
    }

    host.remove();
  }

  for (const paragraph of Array.from(container.querySelectorAll(`p.${PARAGRAPH_CLASS}`))) {
    paragraph.classList.remove(PARAGRAPH_CLASS);
  }
}

function applyCaption(root, caption) {
  const text = normalizeText(caption);
  if (!text) {
    return;
  }

  const host = ensureHost(root);
  if (!host) {
    return;
  }

  const existingCaption = Array.from(host.children).find((child) => child.classList?.contains(TEXT_CLASS)) ?? null;
  if (existingCaption) {
    existingCaption.textContent = text;
    return;
  }

  const captionElement = document.createElement("span");
  captionElement.className = TEXT_CLASS;
  captionElement.textContent = text;
  host.appendChild(captionElement);
}

function findMatchingRootIndex(roots, token, startIndex) {
  const tokenKeys = token.keys?.size ? token.keys : makeKeyCandidates(token.key);
  if (!tokenKeys.size) {
    return -1;
  }

  for (let index = startIndex; index < roots.length; index += 1) {
    const root = roots[index];
    const compatibleType = root.type === token.type || (token.allowInternalRoot && root.type === "internal");
    if (!compatibleType) {
      continue;
    }

    for (const key of tokenKeys) {
      if (root.keys.has(key)) {
        return index;
      }
    }
  }

  return -1;
}

class AttachmentAliasCaptionSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Attachment Alias Caption" });

    const colorSetting = new Setting(containerEl)
      .setName("Caption color")
      .setDesc(this.plugin.settings.captionColor
        ? "Custom caption color."
        : "Using the current theme muted text color. Pick a color to override it.")
      .addColorPicker((colorPicker) => {
        colorPicker
          .setValue(this.plugin.settings.captionColor || FALLBACK_CAPTION_COLOR)
          .onChange(async (value) => {
            this.plugin.settings.captionColor = normalizeHexColor(value) || FALLBACK_CAPTION_COLOR;
            colorSetting.setDesc("Custom caption color.");
            await this.plugin.saveSettings();
          });
      });

    colorSetting.addButton((button) => {
      button
        .setButtonText("Use theme")
        .setTooltip("Use the theme muted text color")
        .onClick(async () => {
          this.plugin.settings.captionColor = "";
          await this.plugin.saveSettings();
          this.display();
        });
    });

    const alphaSetting = new Setting(containerEl)
      .setName("Caption alpha")
      .setDesc(`Current: ${formatAlpha(this.plugin.settings.captionAlpha)}`);

    alphaSetting.addSlider((slider) => {
      slider
        .setLimits(0, 1, 0.05)
        .setValue(this.plugin.settings.captionAlpha)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.captionAlpha = clampCaptionAlpha(value);
          alphaSetting.setDesc(`Current: ${formatAlpha(this.plugin.settings.captionAlpha)}`);
          await this.plugin.saveSettings();
        });
    });

    new Setting(containerEl)
      .setName("Reset appearance")
      .setDesc("Restore the default theme color and full opacity.")
      .addButton((button) => {
        button
          .setButtonText("Reset")
          .onClick(async () => {
            this.plugin.settings = { ...DEFAULT_SETTINGS };
            await this.plugin.saveSettings();
            this.display();
          });
      });
  }
}

class AttachmentAliasCaptionPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    this.refreshTimer = 0;
    this.refreshInFlight = false;
    this.suppressObserver = false;

    this.addSettingTab(new AttachmentAliasCaptionSettingTab(this.app, this));
    this.applySettingsToDocument();

    this.registerMarkdownPostProcessor(() => {
      this.scheduleRefresh();
    });

    this.registerEvent(this.app.workspace.on("layout-change", () => this.scheduleRefresh()));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.scheduleRefresh()));
    this.registerEvent(this.app.workspace.on("file-open", () => this.scheduleRefresh()));

    this.observer = new MutationObserver(() => {
      if (this.suppressObserver) {
        return;
      }

      this.scheduleRefresh();
    });

    this.observer.observe(this.app.workspace.containerEl, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "alt", "class"]
    });

    this.register(() => {
      if (this.refreshTimer) {
        window.clearTimeout(this.refreshTimer);
        this.refreshTimer = 0;
      }

      if (this.followupRefreshTimer) {
        window.clearTimeout(this.followupRefreshTimer);
        this.followupRefreshTimer = 0;
      }

      this.observer?.disconnect();
      this.clearSettingsFromDocument();
    });

    this.scheduleRefresh();
  }

  async loadSettings() {
    this.settings = normalizeSettings(await this.loadData());
  }

  async saveSettings() {
    this.settings = normalizeSettings(this.settings);
    await this.saveData(this.settings);
    this.applySettingsToDocument();
    this.scheduleRefresh();
  }

  applySettingsToDocument() {
    const rootStyle = document.documentElement.style;
    const color = normalizeHexColor(this.settings?.captionColor);
    if (color) {
      rootStyle.setProperty(COLOR_VARIABLE, color);
    } else {
      rootStyle.removeProperty(COLOR_VARIABLE);
    }

    rootStyle.setProperty(OPACITY_VARIABLE, String(clampCaptionAlpha(this.settings?.captionAlpha)));
  }

  clearSettingsFromDocument() {
    const rootStyle = document.documentElement.style;
    rootStyle.removeProperty(COLOR_VARIABLE);
    rootStyle.removeProperty(OPACITY_VARIABLE);
  }

  scheduleRefresh() {
    if (this.refreshTimer) {
      window.clearTimeout(this.refreshTimer);
    }

    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = 0;
      this.refreshAllViews(true);
    }, 120);
  }

  scheduleFollowupRefresh() {
    if (this.followupRefreshTimer) {
      window.clearTimeout(this.followupRefreshTimer);
    }

    this.followupRefreshTimer = window.setTimeout(() => {
      this.followupRefreshTimer = 0;
      this.refreshAllViews(false);
    }, 900);
  }

  async refreshAllViews(scheduleFollowup = false) {
    if (this.refreshInFlight) {
      return;
    }

    this.refreshInFlight = true;
    this.suppressObserver = true;

    try {
      const leaves = this.app.workspace.getLeavesOfType("markdown");
      for (const leaf of leaves) {
        const view = leaf.view;
        if (view instanceof MarkdownView) {
          await this.refreshView(view);
        }
      }
    } finally {
      this.suppressObserver = false;
      this.refreshInFlight = false;
    }

    if (scheduleFollowup) {
      this.scheduleFollowupRefresh();
    }
  }

  async refreshView(view) {
    const source = await this.getViewSource(view);
    if (!source) {
      return;
    }

    const tokens = parseSourceTokens(source);
    const container = view.containerEl;
    if (!container) {
      return;
    }

    clearExistingCaptions(container);

    if (!tokens.length) {
      return;
    }

    const roots = collectRenderedMediaRoots(container);
    let rootIndex = 0;
    for (const token of tokens) {
      const matchIndex = roots.length ? findMatchingRootIndex(roots, token, rootIndex) : -1;
      if (matchIndex === -1) {
        continue;
      }

      applyMediaWidth(roots[matchIndex].root, token.width);
      applyCaption(roots[matchIndex].root, token.caption);
      rootIndex = matchIndex + 1;
    }
  }

  async getViewSource(view) {
    if (typeof view.data === "string") {
      return view.data;
    }

    if (view.file) {
      try {
        return await this.app.vault.cachedRead(view.file);
      } catch {
        return "";
      }
    }

    return "";
  }
}

module.exports = AttachmentAliasCaptionPlugin;
