"use strict";

const { Plugin, MarkdownView, PluginSettingTab, Setting, Modal, Notice } = require("obsidian");

const PLUGIN_STYLE_ID = "xdvc-managed-styles";
const ICON_STYLE_ID = "xdvc-file-icon-rules";
const SETTINGS_STYLE_ID = "xdvc-settings-styles";
const RAINBOW_FOLDER_ATTR = "data-xdvc-rainbow-index";
const RAINBOW_FOLDER_COLOR_COUNT = 7;

const CAPTION_HOST_CLASS = "xdvc-attachment-caption-host";
const CAPTION_TEXT_CLASS = "xdvc-attachment-caption-text";
const CAPTION_PARAGRAPH_CLASS = "xdvc-attachment-caption-paragraph";
const CAPTION_GENERATED_ATTR = "data-xdvc-attachment-caption-generated";
const CAPTION_WIDTH_ATTR = "data-xdvc-attachment-caption-width";
const CAPTION_ORIGINAL_STYLE_ATTR_PREFIX = "data-xdvc-attachment-caption-original-style-";
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

const ONE_DARK_PLUS_COLORS = {
  background: "#1e1e1e",
  foreground: "#d4d4d4",
  keywordControl: "#c586c0",
  keywordType: "#569cd6",
  functionColor: "#dcdcaa",
  stringColor: "#ce9178",
  commentColor: "#6a9955",
  numberColor: "#b5cea8",
  classColor: "#4ec9b0",
  variableColor: "#9cdcfe",
  macroColor: "#c586c0"
};

const DEFAULT_SETTINGS = {
  version: 1,
  modules: {
    mediaCenter: true,
    roundedImages: true,
    attachmentCaptions: true,
    rainbowFolders: true,
    indentationGuides: true,
    fileIcons: true,
    rainbowHeadings: true,
    emphasisColors: true,
    linkStyles: true,
    tableStyles: true,
    tableBorders: true,
    codeTheme: true,
    editorFull: true,
    autoAttributeHide: true,
    mathBlockWhite: true
  },
  media: {
    imageRadius: 8,
    captionColor: "",
    captionAlpha: 0.8
  },
  fileExplorer: {
    folderBgInitial: 0.15,
    folderTextInitial: 0.85,
    folderDecay: 0.85,
    folderMinBg: 0.02,
    folderMinText: 0.2,
    folderHover: 1.25,
    guideWidth: 2,
    guideInitial: 0.8,
    guideDecay: 0.7,
    guideMin: 0.18,
    guideHover: 0.85,
    icons: {
      enableFolderIcons: false,
      enableFileIcons: true,
      iconGap: 0,
      iconVerticalOffset: 0,
      folderIcons: [
        { path: "0_收集箱", emoji: "🗑️" },
        { path: "1_项目", emoji: "📁" },
        { path: "2_领域", emoji: "🧭" },
        { path: "3_资源", emoji: "📚" },
        { path: "4_归档", emoji: "📦" },
        { path: "FIEA", emoji: "🚀" }
      ],
      fileTypeIcons: [
        { name: "文本文件", extensions: [".txt", ".ini"], emoji: "📄" },
        { name: "Markdown", extensions: [".md"], emoji: "📝" },
        { name: "图片", extensions: [".png", ".jpg", ".jpeg", ".gif", ".webp"], emoji: "🖼️" },
        { name: "PDF", extensions: [".pdf"], emoji: "📋" },
        { name: "Word", extensions: [".docx", ".doc"], emoji: "📑" },
        { name: "Excel", extensions: [".xlsx", ".xls", ".csv"], emoji: "📈" },
        { name: "PPT", extensions: [".ppt", ".pptx"], emoji: "📊" },
        { name: "视频", extensions: [".mp4", ".mov", ".avi", ".mkv"], emoji: "🎥" },
        { name: "音频", extensions: [".mp3", ".wav", ".flac"], emoji: "🎵" },
        { name: "压缩包", extensions: [".zip", ".rar", ".7z"], emoji: "🗜️" },
        { name: "代码", extensions: [".js", ".css", ".html", ".py", ".java", ".c", ".cpp", ".json"], emoji: "💻" },
        { name: "Canvas", extensions: [".canvas"], emoji: "🎨" },
        { name: "Excalidraw", extensions: [".excalidraw.md"], emoji: "🧩" }
      ]
    }
  },
  typography: {
    headingColors: {
      h1: "rgb(171, 180, 207)",
      h2: "rgb(235, 203, 139)",
      h3: "rgb(163, 190, 140)",
      h4: "rgb(180, 142, 173)",
      h5: "rgb(143, 188, 187)",
      h6: "rgb(129, 161, 193)"
    },
    emphasis: {
      italicColor: "#4CC496",
      boldColor: "#E04C4C",
      boldItalicColor: "#467BD2",
      underlineColor: "#E0BE2E",
      underlineOverride: true,
      keepLinkColor: true
    },
    links: {
      internalColor: "#B1BFF7",
      internalHoverColor: "#C5B7FB",
      externalColor: "#B1BFF7",
      externalHoverColor: "#C5B7FB",
      deadColor: "#63151C",
      hideIconsOnActiveLine: true
    }
  },
  tables: {
    headerBg: "#2B303B",
    headerText: "#FFFFFF",
    hoverColor: "#333333",
    borderColor: "",
    borderWidth: 2
  },
  editor: {
    fullWidth: "95vw",
    metadataCollapsedHeight: "2.7rem",
    metadataCollapsedOpacity: 0.6,
    mathBlockBackground: "#ffffff",
    mathBlockText: "#000000"
  }
};

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeDefaults(defaults, saved) {
  if (Array.isArray(defaults)) {
    return Array.isArray(saved) ? saved : clone(defaults);
  }

  if (isPlainObject(defaults)) {
    const result = {};
    const source = isPlainObject(saved) ? saved : {};
    for (const key of Object.keys(defaults)) {
      result[key] = mergeDefaults(defaults[key], source[key]);
    }
    for (const key of Object.keys(source)) {
      if (!(key in result)) {
        result[key] = source[key];
      }
    }
    return result;
  }

  return saved === undefined ? defaults : saved;
}

function clamp(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function cssNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? String(number) : String(fallback);
}

function cssPx(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? `${number}px` : `${fallback}px`;
}

function normalizeHexColor(value) {
  const text = String(value ?? "").trim();
  const shortMatch = /^#([0-9a-f]{3})$/i.exec(text);
  if (shortMatch) {
    return `#${shortMatch[1].split("").map((char) => char + char).join("")}`;
  }
  return /^#[0-9a-f]{6}$/i.test(text) ? text : "";
}

function colorToPickerValue(value, fallback) {
  const hex = normalizeHexColor(value);
  if (hex) {
    return hex;
  }

  const rgbMatch = /^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/i.exec(String(value ?? "").trim());
  if (rgbMatch) {
    const parts = rgbMatch.slice(1, 4).map((part) => clamp(Number(part), 0, 255, 0));
    return `#${parts.map((part) => part.toString(16).padStart(2, "0")).join("")}`;
  }

  return normalizeHexColor(fallback) || "#ffffff";
}

function colorValue(value, fallback) {
  const text = String(value ?? "").trim();
  if (/^#[0-9a-f]{3}$/i.test(text) || /^#[0-9a-f]{6}$/i.test(text) || /^rgb\(/i.test(text) || /^hsl\(/i.test(text) || /^var\(/i.test(text)) {
    return text;
  }
  return fallback;
}

function escapeAttrValue(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ");
}

function escapeCssString(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, " ");
}

function formatPercent(value) {
  return `${Math.round(clamp(value, 0, 1, 1) * 100)}%`;
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
  return match?.[1] ? Number.parseInt(match[1], 10) : 0;
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
    return host === "youtu.be" || host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com";
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
          token: parseExternalEmbed(text.slice(startIndex + 2, altEnd), text.slice(altEnd + 2, index))
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
  return root.classList?.contains("internal-embed") ? "internal" : "external";
}

function sortByDocumentOrder(elements) {
  return elements.sort((left, right) => {
    if (left === right) {
      return 0;
    }
    return left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });
}

function topFolderKeyFromPath(path) {
  const text = decodeUriComponentSafely(String(path ?? "").trim()).replace(/\\/g, "/");
  return text.split("/").find((part) => part.trim())?.trim() || "";
}

function isVaultFolder(item) {
  return !!item && Array.isArray(item.children);
}

function pushUniqueTopFolderKey(keys, seen, value) {
  const key = topFolderKeyFromPath(value);
  if (key && !seen.has(key)) {
    seen.add(key);
    keys.push(key);
  }
}

function compareFolderKeys(left, right) {
  return String(left).localeCompare(String(right), undefined, {
    numeric: true,
    sensitivity: "base"
  });
}

function sortFolderKeysForFileExplorer(keys, sortOrder) {
  const normalized = String(sortOrder || "alphabetical").toLowerCase();
  const sorted = [...keys];
  if (!normalized || normalized.includes("alphabet")) {
    sorted.sort(compareFolderKeys);
    if (normalized.includes("reverse")) {
      sorted.reverse();
    }
  }
  return sorted;
}

function topFolderKeysFromVault(vault, sortOrder) {
  const keys = [];
  const seen = new Set();
  const root = vault?.getRoot?.();
  const rootChildren = Array.isArray(root?.children) ? root.children : [];
  for (const child of rootChildren) {
    if (isVaultFolder(child)) {
      pushUniqueTopFolderKey(keys, seen, child.path);
    }
  }

  const loadedFiles = typeof vault?.getAllLoadedFiles === "function" ? vault.getAllLoadedFiles() : [];
  for (const file of loadedFiles) {
    const path = String(file?.path ?? "");
    if (!path) {
      continue;
    }
    if (isVaultFolder(file) || path.includes("/") || path.includes("\\")) {
      pushUniqueTopFolderKey(keys, seen, path);
    }
  }
  return sortFolderKeysForFileExplorer(keys, sortOrder);
}

function fileExplorerSortOrder(app) {
  const leaves = typeof app.workspace?.getLeavesOfType === "function" ? app.workspace.getLeavesOfType("file-explorer") : [];
  for (const leaf of leaves) {
    const state = leaf.getViewState?.().state ?? leaf.view?.getState?.() ?? leaf.view?.state;
    if (typeof state?.sortOrder === "string" && state.sortOrder) {
      return state.sortOrder;
    }
  }
  return "alphabetical";
}

function rootKeyCandidates(root) {
  const values = new Set();
  const addValue = (value) => {
    const text = String(value ?? "").trim();
    if (text) {
      values.add(text);
    }
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
  const wrappedRoots = Array.from(container.querySelectorAll(EMBED_ROOT_SELECTOR)).filter((root) => containsMedia(root) && isVisible(root));
  const bareRoots = Array.from(container.querySelectorAll(MEDIA_ELEMENT_SELECTOR)).filter((root) => {
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
    if (!seen.has(preferredRoot)) {
      seen.add(preferredRoot);
      dedupedBareRoots.push(preferredRoot);
    }
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

function ensureCaptionHost(root) {
  if (root.matches?.(EMBED_ROOT_SELECTOR) && !root.matches?.(MEDIA_ELEMENT_SELECTOR)) {
    root.classList.add(CAPTION_HOST_CLASS);
    const parent = root.parentElement;
    if (parent?.tagName === "P" && paragraphHasOnlyHost(parent, root)) {
      parent.classList.add(CAPTION_PARAGRAPH_CLASS);
    }
    return root;
  }

  const parent = root.parentElement;
  if (!parent) {
    return null;
  }

  if (parent.classList.contains(CAPTION_HOST_CLASS) && parent.getAttribute(CAPTION_GENERATED_ATTR) === "true") {
    return parent;
  }

  const host = document.createElement(parent.tagName === "P" ? "span" : "div");
  host.className = CAPTION_HOST_CLASS;
  host.setAttribute(CAPTION_GENERATED_ATTR, "true");
  parent.insertBefore(host, root);
  host.appendChild(root);

  if (parent.tagName === "P" && paragraphHasOnlyHost(parent, host)) {
    parent.classList.add(CAPTION_PARAGRAPH_CLASS);
  }

  return host;
}

function originalStyleAttrName(property) {
  return `${CAPTION_ORIGINAL_STYLE_ATTR_PREFIX}${property.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`;
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
  element.setAttribute(CAPTION_WIDTH_ATTR, "true");
}

function clearGeneratedWidths(container) {
  const styleProperties = ["width", "maxWidth", "height"];
  for (const element of Array.from(container.querySelectorAll(`[${CAPTION_WIDTH_ATTR}]`))) {
    for (const property of styleProperties) {
      const originalAttr = originalStyleAttrName(property);
      if (!element.hasAttribute(originalAttr)) {
        continue;
      }
      element.style[property] = element.getAttribute(originalAttr) ?? "";
      element.removeAttribute(originalAttr);
    }
    element.removeAttribute(CAPTION_WIDTH_ATTR);
  }
}

function applyMediaWidth(root, width) {
  const numericWidth = Number.parseInt(width, 10);
  if (!Number.isFinite(numericWidth) || numericWidth <= 0) {
    return;
  }

  const host = ensureCaptionHost(root);
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

  if (media?.matches?.("img, video")) {
    setGeneratedWidthStyle(media, "height", "auto");
  }
}

function clearExistingCaptions(container) {
  clearGeneratedWidths(container);

  for (const caption of Array.from(container.querySelectorAll(`.${CAPTION_TEXT_CLASS}`))) {
    caption.remove();
  }

  for (const host of Array.from(container.querySelectorAll(`.${CAPTION_HOST_CLASS}[${CAPTION_GENERATED_ATTR}="true"]`))) {
    const parent = host.parentElement;
    if (!parent) {
      continue;
    }
    for (const child of Array.from(host.childNodes)) {
      parent.insertBefore(child, host);
    }
    host.remove();
  }

  for (const paragraph of Array.from(container.querySelectorAll(`p.${CAPTION_PARAGRAPH_CLASS}`))) {
    paragraph.classList.remove(CAPTION_PARAGRAPH_CLASS);
  }
}

function applyCaption(root, caption) {
  const text = normalizeText(caption);
  if (!text) {
    return;
  }

  const host = ensureCaptionHost(root);
  if (!host) {
    return;
  }

  const existingCaption = Array.from(host.children).find((child) => child.classList?.contains(CAPTION_TEXT_CLASS)) ?? null;
  if (existingCaption) {
    existingCaption.textContent = text;
    return;
  }

  const captionElement = document.createElement("span");
  captionElement.className = CAPTION_TEXT_CLASS;
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

class XDVisualCorePlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this.injectSettingsStyles();
    this.addSettingTab(new XDVisualCoreSettingTab(this.app, this));

    this.addCommand({
      id: "open-settings",
      name: "Open settings",
      callback: () => this.openSettings()
    });
    this.addCommand({
      id: "reload-styles",
      name: "Reload styles",
      callback: () => {
        this.applyAll();
        new Notice("XD Visual Core styles reloaded.");
      }
    });
    this.addCommand({
      id: "disable-all-managed-styles",
      name: "Disable all managed styles",
      callback: async () => {
        for (const key of Object.keys(this.settings.modules)) {
          this.settings.modules[key] = false;
        }
        await this.saveSettings();
        new Notice("XD Visual Core managed styles disabled.");
      }
    });

    this.refreshInFlight = false;
    this.suppressObserver = false;

    this.registerMarkdownPostProcessor(() => this.scheduleCaptionRefresh());
    this.registerEvent(this.app.workspace.on("layout-change", () => {
      this.scheduleCaptionRefresh();
      this.scheduleFileTreeRefresh();
    }));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.scheduleCaptionRefresh()));
    this.registerEvent(this.app.workspace.on("file-open", () => this.scheduleCaptionRefresh()));
    for (const eventName of ["create", "delete", "rename"]) {
      this.registerEvent(this.app.vault.on(eventName, () => this.scheduleFileTreeRefresh()));
    }

    this.observer = new MutationObserver((records) => {
      if (!this.suppressObserver) {
        this.scheduleCaptionRefresh();
        if (records.some((record) => record.type === "childList" || record.attributeName === "data-path")) {
          this.scheduleFileTreeRefresh();
        }
      }
    });
    this.observer.observe(this.app.workspace.containerEl, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "alt", "class", "data-path"]
    });

    this.register(() => {
      if (this.refreshTimer) {
        window.clearTimeout(this.refreshTimer);
      }
      if (this.followupRefreshTimer) {
        window.clearTimeout(this.followupRefreshTimer);
      }
      if (this.fileTreeRefreshTimer) {
        window.clearTimeout(this.fileTreeRefreshTimer);
      }
      this.observer?.disconnect();
      this.clearAllGeneratedCaptions();
      this.clearFileTreeRainbowColors();
      this.removeInjectedStyles();
      this.clearBodyClasses();
    });

    this.applyAll();
  }

  async loadSettings() {
    this.settings = mergeDefaults(DEFAULT_SETTINGS, await this.loadData());
    this.normalizeSettings();
  }

  async saveSettings() {
    this.normalizeSettings();
    await this.saveData(this.settings);
    this.applyAll();
  }

  normalizeSettings() {
    this.settings.version = 1;
    this.settings.media.captionAlpha = clamp(this.settings.media.captionAlpha, 0, 1, DEFAULT_SETTINGS.media.captionAlpha);
    this.settings.media.imageRadius = clamp(this.settings.media.imageRadius, 0, 48, DEFAULT_SETTINGS.media.imageRadius);
    this.settings.fileExplorer.folderBgInitial = clamp(this.settings.fileExplorer.folderBgInitial, 0, 1, DEFAULT_SETTINGS.fileExplorer.folderBgInitial);
    this.settings.fileExplorer.folderTextInitial = clamp(this.settings.fileExplorer.folderTextInitial, 0, 1, DEFAULT_SETTINGS.fileExplorer.folderTextInitial);
    this.settings.fileExplorer.folderDecay = clamp(this.settings.fileExplorer.folderDecay, 0, 1, DEFAULT_SETTINGS.fileExplorer.folderDecay);
    this.settings.fileExplorer.folderMinBg = clamp(this.settings.fileExplorer.folderMinBg, 0, 1, DEFAULT_SETTINGS.fileExplorer.folderMinBg);
    this.settings.fileExplorer.folderMinText = clamp(this.settings.fileExplorer.folderMinText, 0, 1, DEFAULT_SETTINGS.fileExplorer.folderMinText);
    this.settings.fileExplorer.folderHover = clamp(this.settings.fileExplorer.folderHover, 0, 2, DEFAULT_SETTINGS.fileExplorer.folderHover);
    this.settings.fileExplorer.guideWidth = clamp(this.settings.fileExplorer.guideWidth, 0, 6, DEFAULT_SETTINGS.fileExplorer.guideWidth);
    this.settings.fileExplorer.guideInitial = clamp(this.settings.fileExplorer.guideInitial, 0, 1, DEFAULT_SETTINGS.fileExplorer.guideInitial);
    this.settings.fileExplorer.guideDecay = clamp(this.settings.fileExplorer.guideDecay, 0, 1, DEFAULT_SETTINGS.fileExplorer.guideDecay);
    this.settings.fileExplorer.guideMin = clamp(this.settings.fileExplorer.guideMin, 0, 1, DEFAULT_SETTINGS.fileExplorer.guideMin);
    this.settings.fileExplorer.guideHover = clamp(this.settings.fileExplorer.guideHover, 0, 1, DEFAULT_SETTINGS.fileExplorer.guideHover);
    this.settings.tables.borderWidth = clamp(this.settings.tables.borderWidth, 0, 5, DEFAULT_SETTINGS.tables.borderWidth);
    this.settings.editor.metadataCollapsedOpacity = clamp(this.settings.editor.metadataCollapsedOpacity, 0, 1, DEFAULT_SETTINGS.editor.metadataCollapsedOpacity);
  }

  openSettings() {
    if (this.app.setting?.open) {
      this.app.setting.open();
      this.app.setting.openTabById?.(this.manifest.id);
    }
  }

  applyAll() {
    this.updateBodyClasses();
    this.injectManagedCSS();
    this.injectFileIconCSS();
    this.scheduleCaptionRefresh();
    this.scheduleFileTreeRefresh(0);
  }

  updateBodyClasses() {
    const { modules, typography } = this.settings;
    document.body.classList.toggle("xdvc-em-underline-override", !!(modules.emphasisColors && typography.emphasis.underlineOverride));
    document.body.classList.toggle("xdvc-em-keep-link-color", !!(modules.emphasisColors && typography.emphasis.keepLinkColor));
    document.body.classList.toggle("xdvc-hide-link-icons-on-active-line", !!(modules.linkStyles && typography.links.hideIconsOnActiveLine));
  }

  clearBodyClasses() {
    document.body.classList.remove("xdvc-em-underline-override", "xdvc-em-keep-link-color", "xdvc-hide-link-icons-on-active-line");
  }

  scheduleFileTreeRefresh(delay = 80) {
    if (this.fileTreeRefreshTimer) {
      window.clearTimeout(this.fileTreeRefreshTimer);
    }

    this.fileTreeRefreshTimer = window.setTimeout(() => {
      this.fileTreeRefreshTimer = null;
      this.refreshFileTreeRainbowColors();
    }, delay);
  }

  refreshFileTreeRainbowColors() {
    const modules = this.settings.modules;
    if (!(modules.rainbowFolders || modules.indentationGuides)) {
      this.clearFileTreeRainbowColors();
      return;
    }

    const root = this.app.workspace.containerEl;
    const folderTitles = Array.from(root.querySelectorAll('.workspace-leaf-content[data-type="file-explorer"] .nav-folder-title[data-path]'));
    if (!folderTitles.length) {
      return;
    }

    const colorByTopFolder = this.getRainbowFolderColorMap();
    const sortOrder = fileExplorerSortOrder(this.app);

    for (const title of sortByDocumentOrder(folderTitles)) {
      const key = topFolderKeyFromPath(title.getAttribute("data-path"));
      if (!key) {
        this.clearFolderRainbowColor(title);
        continue;
      }

      this.applyFolderRainbowColor(title, colorByTopFolder.get(key) ?? this.fallbackRainbowColorIndex(key, colorByTopFolder, sortOrder));
    }
  }

  getRainbowFolderColorMap() {
    const colorByTopFolder = new Map();
    for (const key of topFolderKeysFromVault(this.app.vault, fileExplorerSortOrder(this.app))) {
      colorByTopFolder.set(key, (colorByTopFolder.size % RAINBOW_FOLDER_COLOR_COUNT) + 1);
    }
    return colorByTopFolder;
  }

  fallbackRainbowColorIndex(key, colorByTopFolder, sortOrder) {
    const orderedKeys = sortFolderKeysForFileExplorer([...colorByTopFolder.keys(), key], sortOrder);
    const position = orderedKeys.indexOf(key);
    return ((position === -1 ? colorByTopFolder.size : position) % RAINBOW_FOLDER_COLOR_COUNT) + 1;
  }

  applyFolderRainbowColor(title, index) {
    const value = String(index);
    const folder = title.closest(".tree-item.nav-folder");
    const children = folder ? Array.from(folder.children).find((child) => child.classList?.contains("tree-item-children")) : null;
    for (const element of [folder, title, children]) {
      if (element && element.getAttribute(RAINBOW_FOLDER_ATTR) !== value) {
        element.setAttribute(RAINBOW_FOLDER_ATTR, value);
      }
    }
  }

  clearFolderRainbowColor(title) {
    const folder = title.closest(".tree-item.nav-folder");
    const children = folder ? Array.from(folder.children).find((child) => child.classList?.contains("tree-item-children")) : null;
    for (const element of [folder, title, children]) {
      element?.removeAttribute(RAINBOW_FOLDER_ATTR);
    }
  }

  clearFileTreeRainbowColors() {
    for (const element of Array.from(this.app.workspace.containerEl.querySelectorAll(`[${RAINBOW_FOLDER_ATTR}]`))) {
      element.removeAttribute(RAINBOW_FOLDER_ATTR);
    }
  }

  injectManagedCSS() {
    let style = document.getElementById(PLUGIN_STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = PLUGIN_STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = this.buildManagedCSS();
  }

  injectFileIconCSS() {
    let style = document.getElementById(ICON_STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = ICON_STYLE_ID;
      document.head.appendChild(style);
    }

    const { modules, fileExplorer } = this.settings;
    if (!modules.fileIcons) {
      style.textContent = "";
      return;
    }

    const iconSettings = fileExplorer.icons;
    const gap = cssNumber(iconSettings.iconGap, 0);
    const offset = cssNumber(iconSettings.iconVerticalOffset, 0);
    const commonProps = `
      display: inline-block;
      margin-right: ${gap}px !important;
      font-style: normal;
      line-height: 1;
      position: relative;
      vertical-align: baseline;
      transform: translateY(${offset}px);
    `;

    let css = "";
    if (iconSettings.enableFolderIcons) {
      for (const icon of iconSettings.folderIcons) {
        const safePath = escapeAttrValue(icon.path);
        css += `
.nav-folder-title[data-path^="${safePath}"] > .tree-item-inner::before {
  content: "${escapeAttrValue(icon.emoji)}";
  ${commonProps}
}
`;
      }
    }

    if (iconSettings.enableFileIcons) {
      for (const icon of iconSettings.fileTypeIcons) {
        const selectors = icon.extensions
          .map((ext) => `div[data-path$='${escapeCssString(ext)}'] .nav-file-title-content::before`)
          .join(",\n");
        if (selectors) {
          css += `
/* ${icon.name} */
${selectors} {
  content: '${escapeCssString(icon.emoji)}';
  ${commonProps}
}
`;
        }
      }
    }

    style.textContent = css;
  }

  removeInjectedStyles() {
    document.getElementById(PLUGIN_STYLE_ID)?.remove();
    document.getElementById(ICON_STYLE_ID)?.remove();
    document.getElementById(SETTINGS_STYLE_ID)?.remove();
  }

  injectSettingsStyles() {
    let style = document.getElementById(SETTINGS_STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = SETTINGS_STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = SETTINGS_CSS;
  }

  buildManagedCSS() {
    const css = [this.buildVariableCSS()];
    const modules = this.settings.modules;

    if (modules.mediaCenter) css.push(MEDIA_CENTER_CSS);
    if (modules.roundedImages) css.push(roundedImagesCSS(this.settings));
    if (modules.attachmentCaptions) css.push(ATTACHMENT_CAPTION_CSS);
    if (modules.rainbowFolders || modules.indentationGuides) css.push(rainbowCommonCSS(this.settings));
    if (modules.rainbowFolders) css.push(RAINBOW_FOLDERS_CSS);
    if (modules.indentationGuides) css.push(INDENTATION_GUIDES_CSS);
    if (modules.rainbowHeadings) css.push(RAINBOW_HEADINGS_CSS);
    if (modules.emphasisColors) css.push(EMPHASIS_COLORS_CSS);
    if (modules.linkStyles) css.push(LINK_STYLES_CSS);
    if (modules.tableStyles) css.push(TABLE_STYLES_CSS);
    if (modules.tableBorders) css.push(TABLE_BORDERS_CSS);
    if (modules.codeTheme) css.push(ONE_DARK_PLUS_CSS);
    if (modules.editorFull) css.push(EDITOR_FULL_CSS);
    if (modules.autoAttributeHide) css.push(AUTO_ATTRIBUTE_HIDE_CSS);
    if (modules.mathBlockWhite) css.push(MATH_BLOCK_WHITE_CSS);

    return css.join("\n\n");
  }

  buildVariableCSS() {
    const { media, fileExplorer, typography, tables, editor } = this.settings;
    const code = ONE_DARK_PLUS_COLORS;
    const captionColor = colorValue(media.captionColor, "var(--text-muted)");
    const heading = typography.headingColors;
    const emphasis = typography.emphasis;
    const links = typography.links;

    return `
:root {
  --xdvc-image-radius: ${cssPx(media.imageRadius, 8)};
  --xdvc-attachment-caption-size: var(--font-smaller);
  --xdvc-attachment-caption-color: ${captionColor || "var(--text-muted)"};
  --xdvc-attachment-caption-opacity: ${cssNumber(media.captionAlpha, 0.8)};
  --xdvc-attachment-caption-gap: 4px;
  --xdvc-attachment-caption-weight: normal;
  --xdvc-attachment-caption-style: italic;
  --xdvc-attachment-caption-padding: 2px 4px;
  --xdvc-attachment-caption-radius: 0;
  --xdvc-attachment-caption-align: center;
  --xdvc-folder-bg-initial: ${cssNumber(fileExplorer.folderBgInitial, 0.15)};
  --xdvc-folder-text-initial: ${cssNumber(fileExplorer.folderTextInitial, 0.85)};
  --xdvc-folder-decay: ${cssNumber(fileExplorer.folderDecay, 0.85)};
  --xdvc-folder-min-bg: ${cssNumber(fileExplorer.folderMinBg, 0.02)};
  --xdvc-folder-min-text: ${cssNumber(fileExplorer.folderMinText, 0.2)};
  --xdvc-folder-hover: ${cssNumber(fileExplorer.folderHover, 1.25)};
  --xdvc-guide-width: ${cssNumber(fileExplorer.guideWidth, 2)};
  --xdvc-guide-initial: ${cssNumber(fileExplorer.guideInitial, 0.8)};
  --xdvc-guide-decay: ${cssNumber(fileExplorer.guideDecay, 0.7)};
  --xdvc-guide-min: ${cssNumber(fileExplorer.guideMin, 0.18)};
  --xdvc-guide-hover: ${cssNumber(fileExplorer.guideHover, 0.85)};
  --xdvc-rainbow-h1: ${colorValue(heading.h1, "rgb(171, 180, 207)")};
  --xdvc-rainbow-h2: ${colorValue(heading.h2, "rgb(235, 203, 139)")};
  --xdvc-rainbow-h3: ${colorValue(heading.h3, "rgb(163, 190, 140)")};
  --xdvc-rainbow-h4: ${colorValue(heading.h4, "rgb(180, 142, 173)")};
  --xdvc-rainbow-h5: ${colorValue(heading.h5, "rgb(143, 188, 187)")};
  --xdvc-rainbow-h6: ${colorValue(heading.h6, "rgb(129, 161, 193)")};
  --xdvc-em-italic-color: ${colorValue(emphasis.italicColor, "#4CC496")};
  --xdvc-em-bold-color: ${colorValue(emphasis.boldColor, "#E04C4C")};
  --xdvc-em-bold-italic-color: ${colorValue(emphasis.boldItalicColor, "#467BD2")};
  --xdvc-em-underline-color: ${colorValue(emphasis.underlineColor, "#E0BE2E")};
  --xdvc-link-internal-color: ${colorValue(links.internalColor, "#B1BFF7")};
  --xdvc-link-internal-hover-color: ${colorValue(links.internalHoverColor, "#C5B7FB")};
  --xdvc-link-external-color: ${colorValue(links.externalColor, "#B1BFF7")};
  --xdvc-link-external-hover-color: ${colorValue(links.externalHoverColor, "#C5B7FB")};
  --xdvc-link-dead-color: ${colorValue(links.deadColor, "#63151C")};
  --xdvc-table-header-bg: ${colorValue(tables.headerBg, "#2B303B")};
  --xdvc-table-header-text: ${colorValue(tables.headerText, "#FFFFFF")};
  --xdvc-table-hover-color: ${colorValue(tables.hoverColor, "#333333")};
  --xdvc-table-border-auto: rgba(127, 127, 127, 0.45);
  --xdvc-table-border-color: ${colorValue(tables.borderColor, "var(--xdvc-table-border-auto)")};
  --xdvc-table-border-width: ${cssPx(tables.borderWidth, 2)};
  --xdvc-vs-bg: ${colorValue(code.background, "#1e1e1e")};
  --xdvc-vs-fg: ${colorValue(code.foreground, "#d4d4d4")};
  --xdvc-vs-keyword-control: ${colorValue(code.keywordControl, "#c586c0")};
  --xdvc-vs-keyword-type: ${colorValue(code.keywordType, "#569cd6")};
  --xdvc-vs-function: ${colorValue(code.functionColor, "#dcdcaa")};
  --xdvc-vs-string: ${colorValue(code.stringColor, "#ce9178")};
  --xdvc-vs-comment: ${colorValue(code.commentColor, "#6a9955")};
  --xdvc-vs-number: ${colorValue(code.numberColor, "#b5cea8")};
  --xdvc-vs-class: ${colorValue(code.classColor, "#4ec9b0")};
  --xdvc-vs-variable: ${colorValue(code.variableColor, "#9cdcfe")};
  --xdvc-vs-macro: ${colorValue(code.macroColor, "#c586c0")};
  --xdvc-editor-full-width: ${String(editor.fullWidth || "95vw")};
  --xdvc-metadata-collapsed-height: ${String(editor.metadataCollapsedHeight || "2.7rem")};
  --xdvc-metadata-collapsed-opacity: ${cssNumber(editor.metadataCollapsedOpacity, 0.6)};
  --xdvc-math-block-bg: ${colorValue(editor.mathBlockBackground, "#ffffff")};
  --xdvc-math-block-text: ${colorValue(editor.mathBlockText, "#000000")};
}
body.theme-dark {
  --xdvc-table-border-auto: rgba(255, 255, 255, 0.35);
}
body.theme-light {
  --xdvc-table-border-auto: rgba(0, 0, 0, 0.22);
}`;
  }

  scheduleCaptionRefresh() {
    if (this.refreshTimer) {
      window.clearTimeout(this.refreshTimer);
    }

    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = 0;
      this.refreshAllViews(true);
    }, 120);
  }

  scheduleFollowupCaptionRefresh() {
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
      this.scheduleFollowupCaptionRefresh();
    }
  }

  async refreshView(view) {
    const container = view.containerEl;
    if (!container) {
      return;
    }

    clearExistingCaptions(container);
    if (!this.settings.modules.attachmentCaptions) {
      return;
    }

    const source = await this.getViewSource(view);
    if (!source) {
      return;
    }

    const tokens = parseSourceTokens(source);
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

  clearAllGeneratedCaptions() {
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      if (view instanceof MarkdownView && view.containerEl) {
        clearExistingCaptions(view.containerEl);
      }
    }
  }
}

class XDVisualCoreSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.openSections = new Set();
  }

  display() {
    const { containerEl } = this;
    const settings = this.plugin.settings;
    containerEl.empty();
    containerEl.addClass("xdvc-settings");
    const headerEl = containerEl.createDiv({ cls: "xdvc-settings-header" });
    headerEl.createEl("h2", { text: "XD Visual Core" });
    headerEl.createDiv({
      cls: "xdvc-settings-subtitle",
      text: "集中管理 Obsidian 外观模块、文件树图标、媒体标题和常用视觉样式。",
    });

    this.renderMediaSection(containerEl, settings);
    this.renderFileExplorerSection(containerEl, settings);
    this.renderTypographySection(containerEl, settings);
    this.renderTableSection(containerEl, settings);
    this.renderCodeSection(containerEl);
    this.renderEditorSection(containerEl, settings);
  }

  renderSection(containerEl, id, title, desc) {
    const section = containerEl.createEl("details", { cls: "xdvc-section" });
    section.open = this.openSections.has(id);

    const summary = section.createEl("summary", { cls: "xdvc-section-header" });
    const titleWrap = summary.createSpan({ cls: "xdvc-section-title-wrap" });
    titleWrap.createSpan({ cls: "xdvc-section-title", text: title });
    titleWrap.createSpan({ cls: "xdvc-section-desc", text: desc });

    const meta = summary.createSpan({ cls: "xdvc-section-meta" });
    meta.createSpan({ cls: "xdvc-section-chevron", text: "›" });

    section.addEventListener("toggle", () => {
      if (section.open) {
        this.openSections.add(id);
      } else {
        this.openSections.delete(id);
      }
    });

    return section.createDiv({ cls: "xdvc-section-content" });
  }

  addModuleToggle(containerEl, moduleKey, name, desc, rerender = false) {
    new Setting(containerEl)
      .setName(name)
      .setDesc(desc)
      .addToggle((toggle) => {
        toggle.setValue(!!this.plugin.settings.modules[moduleKey]).onChange(async (value) => {
          this.plugin.settings.modules[moduleKey] = value;
          await this.plugin.saveSettings();
          if (rerender) {
            this.display();
          }
        });
      });
  }

  addTextSetting(containerEl, name, desc, getter, setter, placeholder = "") {
    new Setting(containerEl)
      .setName(name)
      .setDesc(desc)
      .addText((text) => {
        text.setPlaceholder(placeholder).setValue(String(getter() ?? "")).onChange(async (value) => {
          setter(value);
          await this.plugin.saveSettings();
        });
      });
  }

  addColorSetting(containerEl, name, desc, getter, setter, fallback = "#ffffff") {
    const setting = new Setting(containerEl).setName(name).setDesc(desc);
    setting.addColorPicker((picker) => {
      picker.setValue(colorToPickerValue(getter(), fallback)).onChange(async (value) => {
        setter(normalizeHexColor(value) || value);
        await this.plugin.saveSettings();
      });
    });
  }

  addSubheading(containerEl, title) {
    containerEl.createEl("h4", { text: title });
  }

  addSliderSetting(containerEl, name, desc, getter, setter, min, max, step) {
    const setting = new Setting(containerEl).setName(name);
    setting.setDesc(desc);
    setting.addSlider((slider) => {
      slider.setLimits(min, max, step).setValue(Number(getter())).setDynamicTooltip().onChange(async (value) => {
        setter(value);
        await this.plugin.saveSettings();
      });
    });
  }

  addToggleSetting(containerEl, name, desc, getter, setter) {
    new Setting(containerEl)
      .setName(name)
      .setDesc(desc)
      .addToggle((toggle) => {
        toggle.setValue(!!getter()).onChange(async (value) => {
          setter(value);
          await this.plugin.saveSettings();
        });
      });
  }

  renderMediaSection(containerEl, settings) {
    const section = this.renderSection(containerEl, "media", "媒体显示", "图片居中、圆角和附件标题显示。");
    this.addSubheading(section, "嵌入媒体");
    this.addModuleToggle(section, "mediaCenter", "图片/视频/iframe 居中", "启用后，嵌入的图片、视频和 iframe 会在笔记中居中显示。");
    this.addModuleToggle(section, "roundedImages", "图片圆角", "启用后，笔记里的图片会显示圆角。");
    this.addSliderSetting(section, "图片圆角半径", "调整图片圆角大小，单位 px。", () => settings.media.imageRadius, (value) => settings.media.imageRadius = value, 0, 32, 1);

    this.addSubheading(section, "附件标题");
    this.addModuleToggle(section, "attachmentCaptions", "附件标题 / 宽度识别", "启用后，嵌入附件可以显示标题，并识别宽度写法。");
    this.addColorSetting(section, "附件标题颜色", "设置附件标题文字颜色。", () => settings.media.captionColor || "#8a8a8a", (value) => settings.media.captionColor = value, "#8a8a8a");
    new Setting(section)
      .setName("附件标题使用主题颜色")
      .setDesc("清空自定义颜色，改用当前主题的文本颜色。")
      .addButton((button) => button.setButtonText("使用主题颜色").onClick(async () => {
        settings.media.captionColor = "";
        await this.plugin.saveSettings();
        this.display();
      }));
    this.addSliderSetting(section, "附件标题透明度", "调整附件标题透明度，0 为透明，1 为不透明。", () => settings.media.captionAlpha, (value) => settings.media.captionAlpha = value, 0, 1, 0.05);
  }

  renderFileExplorerSection(containerEl, settings) {
    const section = this.renderSection(containerEl, "file-explorer", "文件树", "彩虹文件夹、缩进线和 Emoji 图标。");
    this.addSubheading(section, "彩虹文件夹");
    this.addModuleToggle(section, "rainbowFolders", "彩虹文件夹", "启用后，文件树里的文件夹会按层级显示不同颜色。");
    this.addSliderSetting(section, "文件夹背景强度", "调整文件夹背景颜色的初始强度。", () => settings.fileExplorer.folderBgInitial, (value) => settings.fileExplorer.folderBgInitial = value, 0, 1, 0.01);
    this.addSliderSetting(section, "文件夹颜色衰减", "控制颜色随层级向内递减的速度。", () => settings.fileExplorer.folderDecay, (value) => settings.fileExplorer.folderDecay = value, 0, 1, 0.01);

    this.addSubheading(section, "缩进引导线");
    this.addModuleToggle(section, "indentationGuides", "彩虹缩进引导线", "启用后，文件树缩进线会按层级显示不同颜色。");
    this.addSliderSetting(section, "引导线宽度", "调整缩进引导线粗细，单位 px。", () => settings.fileExplorer.guideWidth, (value) => settings.fileExplorer.guideWidth = value, 0, 6, 1);
    this.addSliderSetting(section, "引导线强度", "调整缩进引导线的初始颜色强度。", () => settings.fileExplorer.guideInitial, (value) => settings.fileExplorer.guideInitial = value, 0, 1, 0.01);

    this.addSubheading(section, "Emoji 图标");
    this.addModuleToggle(section, "fileIcons", "文件树 Emoji 图标", "启用后，根据文件类型或文件夹规则显示 Emoji 图标。", true);

    if (!settings.modules.fileIcons) {
      return;
    }

    const icons = settings.fileExplorer.icons;
    this.addToggleSetting(section, "启用文件夹图标", "按文件夹路径匹配 Emoji 图标。", () => icons.enableFolderIcons, (value) => icons.enableFolderIcons = value);
    this.addToggleSetting(section, "启用文件类型图标", "按扩展名匹配 Emoji 图标。", () => icons.enableFileIcons, (value) => icons.enableFileIcons = value);
    this.addSliderSetting(section, "图标与文字间距", "调整 Emoji 与文件名之间的距离，单位 px。", () => icons.iconGap, (value) => icons.iconGap = value, 0, 15, 1);
    this.addSliderSetting(section, "图标垂直偏移", "调整 Emoji 在文件名旁的上下位置，负数向上，正数向下。", () => icons.iconVerticalOffset, (value) => icons.iconVerticalOffset = value, -5, 5, 1);

    this.renderIconLists(section, icons);
  }

  renderIconLists(section, icons) {
    section.createEl("h4", { text: "文件夹图标规则" });
    new Setting(section).addButton((button) => button.setButtonText("添加文件夹规则").setCta().onClick(() => {
      new FolderIconModal(this.app, async (path, emoji) => {
        icons.folderIcons.push({ path, emoji });
        await this.plugin.saveSettings();
        this.display();
      }).open();
    }));
    this.renderFolderIconCards(section, icons);

    section.createEl("h4", { text: "文件类型图标规则" });
    new Setting(section).addButton((button) => button.setButtonText("添加文件类型").setCta().onClick(() => {
      new FileTypeIconModal(this.app, async (name, extensions, emoji) => {
        icons.fileTypeIcons.push({ name, extensions, emoji });
        await this.plugin.saveSettings();
        this.display();
      }).open();
    }));
    this.renderFileTypeIconCards(section, icons);
  }

  renderFolderIconCards(section, icons) {
    const list = section.createDiv({ cls: "xdvc-card-list" });
    icons.folderIcons.forEach((icon, index) => {
      const card = list.createDiv({ cls: "xdvc-icon-card" });
      card.createDiv({ cls: "xdvc-icon-preview", text: icon.emoji });
      const info = card.createDiv({ cls: "xdvc-icon-info" });
      info.createDiv({ cls: "xdvc-icon-title", text: icon.path });
      info.createDiv({ cls: "xdvc-icon-subtitle", text: "文件夹路径" });
      const actions = card.createDiv({ cls: "xdvc-icon-actions" });
      actions.createEl("button", { text: "编辑" }).onclick = () => {
        new FolderIconModal(this.app, async (path, emoji) => {
          icons.folderIcons[index] = { path, emoji };
          await this.plugin.saveSettings();
          this.display();
        }, icon).open();
      };
      actions.createEl("button", { text: "删除", cls: "mod-warning" }).onclick = async () => {
        icons.folderIcons.splice(index, 1);
        await this.plugin.saveSettings();
        this.display();
      };
    });
  }

  renderFileTypeIconCards(section, icons) {
    const list = section.createDiv({ cls: "xdvc-card-list" });
    icons.fileTypeIcons.forEach((icon, index) => {
      const card = list.createDiv({ cls: "xdvc-icon-card" });
      card.createDiv({ cls: "xdvc-icon-preview", text: icon.emoji });
      const info = card.createDiv({ cls: "xdvc-icon-info" });
      info.createDiv({ cls: "xdvc-icon-title", text: icon.name });
      info.createDiv({ cls: "xdvc-icon-subtitle", text: icon.extensions.join(", ") });
      const actions = card.createDiv({ cls: "xdvc-icon-actions" });
      actions.createEl("button", { text: "编辑" }).onclick = () => {
        new FileTypeIconModal(this.app, async (name, extensions, emoji) => {
          icons.fileTypeIcons[index] = { name, extensions, emoji };
          await this.plugin.saveSettings();
          this.display();
        }, icon).open();
      };
      actions.createEl("button", { text: "删除", cls: "mod-warning" }).onclick = async () => {
        icons.fileTypeIcons.splice(index, 1);
        await this.plugin.saveSettings();
        this.display();
      };
    });
  }

  renderTypographySection(containerEl, settings) {
    const section = this.renderSection(containerEl, "typography", "文本样式", "标题、强调文本和链接显示颜色。");
    const heading = settings.typography.headingColors;
    const emphasis = settings.typography.emphasis;
    const links = settings.typography.links;

    this.addSubheading(section, "彩虹标题");
    this.addModuleToggle(section, "rainbowHeadings", "彩虹标题", "启用后，H1 到 H6 标题会使用不同颜色。");
    this.addColorSetting(section, "H1 颜色", "设置一级标题颜色。", () => heading.h1, (value) => heading.h1 = value, "#ABB4CF");
    this.addColorSetting(section, "H2 颜色", "设置二级标题颜色。", () => heading.h2, (value) => heading.h2 = value, "#EBCB8B");
    this.addColorSetting(section, "H3 颜色", "设置三级标题颜色。", () => heading.h3, (value) => heading.h3 = value, "#A3BE8C");
    this.addColorSetting(section, "H4 颜色", "设置四级标题颜色。", () => heading.h4, (value) => heading.h4 = value, "#B48EAD");
    this.addColorSetting(section, "H5 颜色", "设置五级标题颜色。", () => heading.h5, (value) => heading.h5 = value, "#8FBCBB");
    this.addColorSetting(section, "H6 颜色", "设置六级标题颜色。", () => heading.h6, (value) => heading.h6 = value, "#81A1C1");

    this.addSubheading(section, "强调色");
    this.addModuleToggle(section, "emphasisColors", "强调色", "启用后，粗体、斜体和下划线会使用更醒目的颜色。");
    this.addColorSetting(section, "斜体颜色", "设置斜体文本颜色。", () => emphasis.italicColor, (value) => emphasis.italicColor = value, "#4CC496");
    this.addColorSetting(section, "粗体颜色", "设置粗体文本颜色。", () => emphasis.boldColor, (value) => emphasis.boldColor = value, "#E04C4C");
    this.addColorSetting(section, "粗斜体颜色", "设置同时粗体和斜体的文本颜色。", () => emphasis.boldItalicColor, (value) => emphasis.boldItalicColor = value, "#467BD2");
    this.addColorSetting(section, "下划线颜色", "设置下划线文本颜色。", () => emphasis.underlineColor, (value) => emphasis.underlineColor = value, "#E0BE2E");
    this.addToggleSetting(section, "覆盖下划线文本颜色", "启用后，下划线文本本身也会使用下划线颜色。", () => emphasis.underlineOverride, (value) => emphasis.underlineOverride = value);
    this.addToggleSetting(section, "强调文本内链接保持链接色", "启用后，强调文本里的链接仍保持链接颜色。", () => emphasis.keepLinkColor, (value) => emphasis.keepLinkColor = value);

    this.addSubheading(section, "链接");
    this.addModuleToggle(section, "linkStyles", "链接样式", "启用后，统一内部链接、外部链接和未创建链接的显示颜色。");
    this.addColorSetting(section, "内部链接颜色", "设置已创建内部链接的颜色。", () => links.internalColor, (value) => links.internalColor = value, "#B1BFF7");
    this.addColorSetting(section, "内部链接悬停颜色", "设置鼠标悬停在内部链接上时的颜色。", () => links.internalHoverColor, (value) => links.internalHoverColor = value, "#C5B7FB");
    this.addColorSetting(section, "外部链接颜色", "设置外部链接颜色。", () => links.externalColor, (value) => links.externalColor = value, "#B1BFF7");
    this.addColorSetting(section, "外部链接悬停颜色", "设置鼠标悬停在外部链接上时的颜色。", () => links.externalHoverColor, (value) => links.externalHoverColor = value, "#C5B7FB");
    this.addColorSetting(section, "未创建链接颜色", "设置尚未创建的内部链接颜色。", () => links.deadColor, (value) => links.deadColor = value, "#63151C");
    this.addToggleSetting(section, "编辑行隐藏链接图标", "启用后，当前编辑行里的链接图标会隐藏，减少视觉干扰。", () => links.hideIconsOnActiveLine, (value) => links.hideIconsOnActiveLine = value);
  }

  renderTableSection(containerEl, settings) {
    const section = this.renderSection(containerEl, "tables", "表格", "表格配色和网格线显示。");
    this.addSubheading(section, "表格配色");
    this.addModuleToggle(section, "tableStyles", "表格主题样式", "启用表头、悬停行和表格整体配色。");
    this.addColorSetting(section, "表头背景", "设置表格表头背景色。", () => settings.tables.headerBg, (value) => settings.tables.headerBg = value, "#2B303B");
    this.addColorSetting(section, "表头文字", "设置表格表头文字颜色。", () => settings.tables.headerText, (value) => settings.tables.headerText = value, "#FFFFFF");
    this.addColorSetting(section, "悬停行颜色", "设置鼠标悬停时的表格行背景色。", () => settings.tables.hoverColor, (value) => settings.tables.hoverColor = value, "#333333");

    this.addSubheading(section, "表格边框");
    this.addSliderSetting(section, "边框粗细", "调整表格边框粗细，单位 px。", () => settings.tables.borderWidth, (value) => settings.tables.borderWidth = value, 0, 5, 0.5);
    this.addColorSetting(section, "边框颜色", "设置表格边框颜色。", () => settings.tables.borderColor || "#8a8a8a", (value) => settings.tables.borderColor = value, "#8a8a8a");
    new Setting(section)
      .setName("边框使用主题颜色")
      .setDesc("清空自定义边框颜色，改用当前主题的边框颜色。")
      .addButton((button) => button.setButtonText("使用主题颜色").onClick(async () => {
        settings.tables.borderColor = "";
        await this.plugin.saveSettings();
        this.display();
      }));
    this.addModuleToggle(section, "tableBorders", "强制显示网格线", "启用后，表格网格线会保持显示。");
  }

  renderCodeSection(containerEl) {
    const section = this.renderSection(containerEl, "code", "代码", "One Dark Plus 代码块配色。");
    this.addModuleToggle(section, "codeTheme", "One Dark Plus 代码块配色", "启用 One Dark Plus 风格的代码块配色。");
  }

  renderEditorSection(containerEl, settings) {
    const section = this.renderSection(containerEl, "editor", "编辑器 / 界面", "编辑区宽度、属性区折叠和数学公式样式。");
    this.addSubheading(section, "编辑区");
    this.addModuleToggle(section, "editorFull", "编辑区满宽", "启用后，编辑区域会使用更宽的可用空间。");
    this.addTextSetting(section, "编辑区宽度", "设置编辑区最大宽度，支持 95vw、1200px 等宽度写法。", () => settings.editor.fullWidth, (value) => settings.editor.fullWidth = value, "95vw");

    this.addSubheading(section, "属性区");
    this.addModuleToggle(section, "autoAttributeHide", "属性区自动折叠", "启用后，属性区默认收起，悬停或聚焦时展开。");
    this.addTextSetting(section, "属性区收起高度", "设置属性区收起时保留的高度，例如 2.7rem。", () => settings.editor.metadataCollapsedHeight, (value) => settings.editor.metadataCollapsedHeight = value, "2.7rem");
    this.addSliderSetting(section, "属性区收起透明度", "调整属性区收起时的透明度，0 为透明，1 为不透明。", () => settings.editor.metadataCollapsedOpacity, (value) => settings.editor.metadataCollapsedOpacity = value, 0, 1, 0.05);

    this.addSubheading(section, "数学公式");
    this.addModuleToggle(section, "mathBlockWhite", "块级数学公式白底", "启用后，块级数学公式使用白底黑字。");
    this.addColorSetting(section, "数学公式背景", "设置块级数学公式背景色。", () => settings.editor.mathBlockBackground, (value) => settings.editor.mathBlockBackground = value, "#ffffff");
    this.addColorSetting(section, "数学公式文字", "设置块级数学公式文字颜色。", () => settings.editor.mathBlockText, (value) => settings.editor.mathBlockText = value, "#000000");
  }
}

class FolderIconModal extends Modal {
  constructor(app, onSubmit, current = null) {
    super(app);
    this.onSubmit = onSubmit;
    this.path = current?.path || "";
    this.emoji = current?.emoji || "";
    this.isEdit = !!current;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: this.isEdit ? "编辑文件夹图标" : "添加文件夹图标" });
    new Setting(contentEl).setName("文件夹名称/路径").setDesc("如: 0_收集箱").addText((text) => text.setValue(this.path).onChange((value) => this.path = value));
    new Setting(contentEl).setName("图标 Emoji").addText((text) => text.setValue(this.emoji).onChange((value) => this.emoji = value));
    new Setting(contentEl).addButton((button) => button.setButtonText("保存").setCta().onClick(() => {
      if (!this.path || !this.emoji) {
        new Notice("请填写完整");
        return;
      }
      this.onSubmit(this.path, this.emoji);
      this.close();
    }));
  }

  onClose() {
    this.contentEl.empty();
  }
}

class FileTypeIconModal extends Modal {
  constructor(app, onSubmit, current = null) {
    super(app);
    this.onSubmit = onSubmit;
    this.name = current?.name || "";
    this.extensions = current?.extensions?.join(",") || "";
    this.emoji = current?.emoji || "";
    this.isEdit = !!current;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: this.isEdit ? "编辑文件类型图标" : "添加文件类型图标" });
    new Setting(contentEl).setName("名称").setDesc("如: 图片").addText((text) => text.setValue(this.name).onChange((value) => this.name = value));
    new Setting(contentEl).setName("后缀名").setDesc("逗号分隔，如 .png,.jpg").addText((text) => text.setValue(this.extensions).onChange((value) => this.extensions = value));
    new Setting(contentEl).setName("图标 Emoji").addText((text) => text.setValue(this.emoji).onChange((value) => this.emoji = value));
    new Setting(contentEl).addButton((button) => button.setButtonText("保存").setCta().onClick(() => {
      const extensions = this.extensions.split(/[,，]/).map((item) => item.trim()).filter(Boolean);
      if (!this.name || !extensions.length || !this.emoji) {
        new Notice("请填写完整");
        return;
      }
      this.onSubmit(this.name, extensions, this.emoji);
      this.close();
    }));
  }

  onClose() {
    this.contentEl.empty();
  }
}

const SETTINGS_CSS = `
.xdvc-section {
  border-top: 1px solid var(--background-modifier-border);
  margin-top: 8px;
}
.xdvc-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  cursor: pointer;
  color: var(--text-normal);
  font-size: var(--font-ui-medium);
  font-weight: 700;
  list-style: none;
  user-select: none;
}
.xdvc-section-header::-webkit-details-marker {
  display: none;
}
.xdvc-section-header::after {
  content: "›";
  color: var(--text-muted);
  font-size: 20px;
  line-height: 1;
  transition: transform 120ms ease;
}
.xdvc-section[open] > .xdvc-section-header::after {
  transform: rotate(90deg);
}
.xdvc-section-content {
  padding-bottom: 10px;
}
.xdvc-section h4 {
  margin: 18px 0 8px;
}
.xdvc-card-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0 14px;
}
.xdvc-icon-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--background-secondary);
  border: 1px solid var(--background-modifier-border);
  border-radius: 8px;
}
.xdvc-icon-preview {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-primary);
  border: 1px solid var(--background-modifier-border);
  border-radius: 6px;
  font-size: 20px;
  flex: 0 0 auto;
}
.xdvc-icon-info {
  min-width: 0;
  flex: 1 1 auto;
}
.xdvc-icon-title {
  font-weight: 600;
}
.xdvc-icon-subtitle {
  color: var(--text-muted);
  font-family: var(--font-monospace);
  font-size: var(--font-ui-small);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.xdvc-icon-actions {
  display: flex;
  gap: 8px;
  flex: 0 0 auto;
}
.xdvc-settings {
  max-width: 940px;
}
.xdvc-settings-header {
  margin: 0 0 18px;
  padding: 0;
}
.xdvc-settings-header > h2 {
  margin: 0 0 4px;
  padding: 0;
  font-size: 22px;
  font-weight: 750;
  line-height: 1.2;
}
.xdvc-settings-subtitle {
  margin: 0;
  padding: 0;
  color: var(--text-muted);
  font-size: var(--font-ui-small);
  line-height: 1.35;
}
.xdvc-section {
  border: 1px solid var(--background-modifier-border);
  border-radius: 8px;
  background: var(--background-secondary);
  margin: 8px 0;
  overflow: hidden;
  transition: border-color 120ms ease, background-color 120ms ease;
}
.xdvc-section:hover {
  border-color: var(--background-modifier-border-hover);
}
.xdvc-section[open] {
  border-color: color-mix(in srgb, var(--interactive-accent) 35%, var(--background-modifier-border));
  background: var(--background-secondary-alt);
}
.xdvc-section-header {
  min-height: 58px;
  padding: 10px 12px;
  background: transparent;
}
.xdvc-section[open] > .xdvc-section-header {
  border-bottom: 1px solid var(--background-modifier-border);
}
.xdvc-section-header::after {
  content: none;
  display: none;
}
.xdvc-section-title-wrap {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.xdvc-section-title {
  color: var(--text-normal);
  font-size: var(--font-ui-medium);
  font-weight: 750;
  line-height: 1.25;
}
.xdvc-section-desc {
  color: var(--text-muted);
  font-size: var(--font-ui-smaller);
  font-weight: 500;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.xdvc-section-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  margin-left: auto;
}
.xdvc-section-chevron {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 20px;
  line-height: 1;
  transition: transform 120ms ease, color 120ms ease;
}
.xdvc-section[open] > .xdvc-section-header .xdvc-section-chevron {
  color: var(--text-accent);
  transform: rotate(90deg);
}
.xdvc-section-content {
  padding: 8px 12px 12px;
  background: color-mix(in srgb, var(--background-primary) 58%, transparent);
}
.xdvc-section-content > .setting-item {
  padding: 8px 0;
  border-top: 1px solid color-mix(in srgb, var(--background-modifier-border) 72%, transparent);
}
.xdvc-section-content > .setting-item:first-child {
  border-top: none;
}
.xdvc-section h4 {
  margin: 14px 0 6px;
  color: var(--text-accent);
  font-size: var(--font-ui-smaller);
  font-weight: 800;
  letter-spacing: 0;
}
.xdvc-card-list {
  margin: 6px 0 12px;
}
.xdvc-icon-card {
  background: var(--background-primary);
  border-radius: 6px;
}
`;

const MEDIA_CENTER_CSS = `
.markdown-source-view.mod-cm6 .cm-embed-block {
  text-align: initial !important;
}
.markdown-reading-view .image-embed,
.markdown-preview-view .image-embed,
.markdown-source-view.mod-cm6 .cm-content :is(.internal-embed.image-embed, .image-embed) {
  display: table !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
.markdown-reading-view .image-embed img,
.markdown-preview-view .image-embed img,
.markdown-source-view.mod-cm6 .cm-content :is(.internal-embed.image-embed, .image-embed) img,
.markdown-reading-view :is(p, li, blockquote) > img:only-child:not(.emoji),
.markdown-preview-view :is(p, li, blockquote) > img:only-child:not(.emoji),
.markdown-reading-view table img,
.markdown-preview-view table img,
.markdown-source-view.mod-cm6 table img {
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
.markdown-source-view.mod-cm6 .cm-line:has(> img:only-child:not(.emoji)) {
  text-align: center !important;
}
.markdown-source-view.mod-cm6 .cm-line > img:only-child:not(.emoji) {
  display: inline-block !important;
}
.image-embed .image-caption {
  text-align: center !important;
}
img.emoji {
  display: inline !important;
  margin: 0 !important;
}
.image-embed[style*="float"],
.markdown-reading-view img[style*="float"],
.markdown-preview-view img[style*="float"],
.markdown-source-view.mod-cm6 img[style*="float"] {
  float: none !important;
}
.markdown-reading-view pre,
.markdown-preview-view pre,
.markdown-reading-view code,
.markdown-preview-view code,
.markdown-source-view.mod-cm6 .cm-inline-code,
.markdown-source-view.mod-cm6 .cm-line.HyperMD-codeblock,
.markdown-source-view.mod-cm6 .HyperMD-codeblock.cm-line,
.markdown-reading-view :is(blockquote, li) pre,
.markdown-preview-view :is(blockquote, li) pre,
.callout pre,
.callout code {
  text-align: left !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.markdown-reading-view :is(.video-embed, .internal-embed, .media-embed):has(> video),
.markdown-preview-view :is(.video-embed, .internal-embed, .media-embed):has(> video),
.markdown-source-view.mod-cm6 .cm-content :is(.video-embed, .internal-embed, .media-embed):has(> video),
.markdown-reading-view :is(p, li, blockquote, div) > video:only-child,
.markdown-preview-view :is(p, li, blockquote, div) > video:only-child,
.markdown-source-view.mod-cm6 .cm-content :is(p, li, blockquote, div) > video:only-child,
.markdown-reading-view :is(.internal-embed, .media-embed):has(> iframe),
.markdown-preview-view :is(.internal-embed, .media-embed):has(> iframe),
.markdown-source-view.mod-cm6 .cm-content :is(.internal-embed, .media-embed):has(> iframe),
.markdown-reading-view :is(p, li, blockquote, div) > iframe:only-child,
.markdown-preview-view :is(p, li, blockquote, div) > iframe:only-child,
.markdown-source-view.mod-cm6 .cm-content :is(p, li, blockquote, div) > iframe:only-child,
.markdown-reading-view :is(iframe, webview),
.markdown-preview-view :is(iframe, webview),
.markdown-source-view.mod-cm6 :is(iframe, webview),
.markdown-reading-view :is(iframe.external-embed, img.external-embed, .external-embed),
.markdown-preview-view :is(iframe.external-embed, img.external-embed, .external-embed),
.markdown-source-view.mod-cm6 :is(iframe.external-embed, img.external-embed, .external-embed) {
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 100% !important;
  float: none !important;
}
.markdown-reading-view :is(.external-embed, .media-embed, .internal-embed, .video-embed):has(iframe),
.markdown-preview-view :is(.external-embed, .media-embed, .internal-embed, .video-embed):has(iframe),
.markdown-source-view.mod-cm6 :is(.cm-embed-block, .external-embed, .media-embed, .internal-embed, .video-embed):has(iframe),
.markdown-reading-view :is(p, div, figure, li, blockquote, .external-embed, .media-embed, .internal-embed, .video-embed):has(iframe),
.markdown-preview-view :is(p, div, figure, li, blockquote, .external-embed, .media-embed, .internal-embed, .video-embed):has(iframe),
.markdown-source-view.mod-cm6 :is(.cm-line, .cm-embed-block, .cm-preview-code-block, .cm-html-embed, .external-embed, .media-embed, .internal-embed, .video-embed):has(iframe),
.markdown-reading-view :is(p, div, figure, li, blockquote, .external-embed, .media-embed, .internal-embed, .video-embed):has(webview),
.markdown-preview-view :is(p, div, figure, li, blockquote, .external-embed, .media-embed, .internal-embed, .video-embed):has(webview),
.markdown-source-view.mod-cm6 :is(.cm-line, .cm-embed-block, .cm-preview-code-block, .cm-html-embed, .external-embed, .media-embed, .internal-embed, .video-embed):has(webview),
.markdown-source-view.mod-cm6 :is(.cm-embed-block, .cm-preview-code-block, .cm-html-embed):has(.external-embed),
.markdown-source-view.mod-cm6 :is(.cm-embed-block, .cm-preview-code-block, .cm-html-embed):has(iframe.external-embed),
.markdown-source-view.mod-cm6 :is(.cm-embed-block, .cm-preview-code-block, .cm-html-embed):has(img.external-embed),
.markdown-source-view.mod-cm6 :is(.cm-embed-block, .cm-preview-code-block, .cm-html-embed):has(a:only-child > img:only-child) {
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
  float: none !important;
}
.markdown-reading-view :is(p, div, li, blockquote) > a:only-child:has(> img:only-child),
.markdown-preview-view :is(p, div, li, blockquote) > a:only-child:has(> img:only-child),
.markdown-source-view.mod-cm6 :is(.cm-line, .cm-embed-block, .cm-preview-code-block, .cm-html-embed) a:only-child:has(> img:only-child) {
  display: table !important;
  margin-left: auto !important;
  margin-right: auto !important;
  float: none !important;
}
.markdown-reading-view :is(p, div, li, blockquote) > a:only-child:has(> img:only-child) > img:only-child,
.markdown-preview-view :is(p, div, li, blockquote) > a:only-child:has(> img:only-child) > img:only-child,
.markdown-source-view.mod-cm6 :is(.cm-line, .cm-embed-block, .cm-preview-code-block, .cm-html-embed) a:only-child:has(> img:only-child) > img:only-child {
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 100% !important;
}
`;

function roundedImagesCSS() {
  return `
.markdown-preview-view img,
.markdown-source-view.mod-cm6 img {
  border-radius: var(--xdvc-image-radius);
  overflow: hidden;
}`;
}

const ATTACHMENT_CAPTION_CSS = `
.${CAPTION_HOST_CLASS} {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: var(--xdvc-attachment-caption-align);
  box-sizing: border-box;
}
span.${CAPTION_HOST_CLASS} {
  display: inline-flex;
  vertical-align: top;
}
.${CAPTION_HOST_CLASS} > :first-child {
  max-width: 100%;
}
.${CAPTION_HOST_CLASS} > :first-child:is(img, video, iframe, embed, object, webview) {
  display: block;
}
.${CAPTION_TEXT_CLASS} {
  display: block;
  margin-top: var(--xdvc-attachment-caption-gap);
  color: var(--xdvc-attachment-caption-color);
  opacity: var(--xdvc-attachment-caption-opacity);
  font-size: var(--xdvc-attachment-caption-size);
  font-weight: var(--xdvc-attachment-caption-weight);
  font-style: var(--xdvc-attachment-caption-style);
  padding: var(--xdvc-attachment-caption-padding);
  border-radius: var(--xdvc-attachment-caption-radius);
  line-height: 1.35;
  text-align: var(--xdvc-attachment-caption-align);
  word-break: break-word;
  box-sizing: border-box;
}
p.${CAPTION_PARAGRAPH_CLASS} {
  text-align: center;
}`;

function rainbowCommonCSS() {
  return `
.workspace-leaf-content[data-type="file-explorer"] {
  --rt-folder-bg-init: var(--xdvc-folder-bg-initial);
  --rt-folder-text-init: var(--xdvc-folder-text-initial);
  --rt-folder-decay: var(--xdvc-folder-decay);
  --rt-folder-hover: var(--xdvc-folder-hover);
  --rt-folder-bg-min: var(--xdvc-folder-min-bg);
  --rt-folder-text-min: var(--xdvc-folder-min-text);
  --rtf-bg-d0: var(--rt-folder-bg-init);
  --rtf-bg-d1: calc(var(--rtf-bg-d0) * var(--rt-folder-decay));
  --rtf-bg-d2: calc(var(--rtf-bg-d1) * var(--rt-folder-decay));
  --rtf-bg-d3: calc(var(--rtf-bg-d2) * var(--rt-folder-decay));
  --rtf-bg-d4: calc(var(--rtf-bg-d3) * var(--rt-folder-decay));
  --rtf-bg-d5: calc(var(--rtf-bg-d4) * var(--rt-folder-decay));
  --rtf-bg-d6: calc(var(--rtf-bg-d5) * var(--rt-folder-decay));
  --rtf-tx-d0: var(--rt-folder-text-init);
  --rtf-tx-d1: calc(var(--rtf-tx-d0) * var(--rt-folder-decay));
  --rtf-tx-d2: calc(var(--rtf-tx-d1) * var(--rt-folder-decay));
  --rtf-tx-d3: calc(var(--rtf-tx-d2) * var(--rt-folder-decay));
  --rtf-tx-d4: calc(var(--rtf-tx-d3) * var(--rt-folder-decay));
  --rtf-tx-d5: calc(var(--rtf-tx-d4) * var(--rt-folder-decay));
  --rtf-tx-d6: calc(var(--rtf-tx-d5) * var(--rt-folder-decay));
  --rtf-bg-d0c: max(var(--rtf-bg-d0), var(--rt-folder-bg-min));
  --rtf-bg-d1c: max(var(--rtf-bg-d1), var(--rt-folder-bg-min));
  --rtf-bg-d2c: max(var(--rtf-bg-d2), var(--rt-folder-bg-min));
  --rtf-bg-d3c: max(var(--rtf-bg-d3), var(--rt-folder-bg-min));
  --rtf-bg-d4c: max(var(--rtf-bg-d4), var(--rt-folder-bg-min));
  --rtf-bg-d5c: max(var(--rtf-bg-d5), var(--rt-folder-bg-min));
  --rtf-bg-d6c: max(var(--rtf-bg-d6), var(--rt-folder-bg-min));
  --rtf-tx-d0c: max(var(--rtf-tx-d0), var(--rt-folder-text-min));
  --rtf-tx-d1c: max(var(--rtf-tx-d1), var(--rt-folder-text-min));
  --rtf-tx-d2c: max(var(--rtf-tx-d2), var(--rt-folder-text-min));
  --rtf-tx-d3c: max(var(--rtf-tx-d3), var(--rt-folder-text-min));
  --rtf-tx-d4c: max(var(--rtf-tx-d4), var(--rt-folder-text-min));
  --rtf-tx-d5c: max(var(--rtf-tx-d5), var(--rt-folder-text-min));
  --rtf-tx-d6c: max(var(--rtf-tx-d6), var(--rt-folder-text-min));
  --rt-folder-rgb-1: var(--color-red-rgb);
  --rt-folder-rgb-2: var(--color-blue-rgb);
  --rt-folder-rgb-3: var(--color-green-rgb);
  --rt-folder-rgb-4: var(--color-orange-rgb);
  --rt-folder-rgb-5: var(--color-purple-rgb);
  --rt-folder-rgb-6: var(--color-cyan-rgb);
  --rt-folder-rgb-7: var(--color-pink-rgb);
  --rt-folder-rgb: var(--rt-folder-rgb-1);
  --rt-guide-width: var(--xdvc-guide-width);
  --rt-guide-hover: var(--xdvc-guide-hover);
  --rt-guide-init: var(--xdvc-guide-initial);
  --rt-guide-mul: var(--xdvc-guide-decay);
  --rt-guide-min: var(--xdvc-guide-min);
  --rtg-d0: var(--rt-guide-init);
  --rtg-d1: calc(var(--rtg-d0) * var(--rt-guide-mul));
  --rtg-d2: calc(var(--rtg-d1) * var(--rt-guide-mul));
  --rtg-d3: calc(var(--rtg-d2) * var(--rt-guide-mul));
  --rtg-d4: calc(var(--rtg-d3) * var(--rt-guide-mul));
  --rtg-d5: calc(var(--rtg-d4) * var(--rt-guide-mul));
  --rtg-d6: calc(var(--rtg-d5) * var(--rt-guide-mul));
  --rtgc-d0: max(var(--rtg-d0), var(--rt-guide-min));
  --rtgc-d1: max(var(--rtg-d1), var(--rt-guide-min));
  --rtgc-d2: max(var(--rtg-d2), var(--rt-guide-min));
  --rtgc-d3: max(var(--rtg-d3), var(--rt-guide-min));
  --rtgc-d4: max(var(--rtg-d4), var(--rt-guide-min));
  --rtgc-d5: max(var(--rtg-d5), var(--rt-guide-min));
  --rtgc-d6: max(var(--rtg-d6), var(--rt-guide-min));
}
.nav-files-container [${RAINBOW_FOLDER_ATTR}="1"] { --rt-folder-rgb: var(--rt-folder-rgb-1); }
.nav-files-container [${RAINBOW_FOLDER_ATTR}="2"] { --rt-folder-rgb: var(--rt-folder-rgb-2); }
.nav-files-container [${RAINBOW_FOLDER_ATTR}="3"] { --rt-folder-rgb: var(--rt-folder-rgb-3); }
.nav-files-container [${RAINBOW_FOLDER_ATTR}="4"] { --rt-folder-rgb: var(--rt-folder-rgb-4); }
.nav-files-container [${RAINBOW_FOLDER_ATTR}="5"] { --rt-folder-rgb: var(--rt-folder-rgb-5); }
.nav-files-container [${RAINBOW_FOLDER_ATTR}="6"] { --rt-folder-rgb: var(--rt-folder-rgb-6); }
.nav-files-container [${RAINBOW_FOLDER_ATTR}="7"] { --rt-folder-rgb: var(--rt-folder-rgb-7); }`;
}

const RAINBOW_FOLDERS_CSS = `
.nav-files-container > div > .tree-item.nav-folder > .nav-folder-title {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-bg-d0c) * 100%), transparent);
  color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d0c) * 100%), transparent);
  --nav-collapse-icon-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d0c) * 100%), transparent);
  --icon-color: var(--nav-collapse-icon-color);
}
.nav-files-container > div > .tree-item.nav-folder > .nav-folder-title:hover {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(min(1, calc(var(--rtf-bg-d0c) * var(--rt-folder-hover))) * 100%), transparent);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item.nav-folder > .nav-folder-title {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-bg-d1c) * 100%), transparent);
  color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d1c) * 100%), transparent);
  --nav-collapse-icon-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d1c) * 100%), transparent);
  --icon-color: var(--nav-collapse-icon-color);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item.nav-folder > .nav-folder-title:hover {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(min(1, calc(var(--rtf-bg-d1c) * var(--rt-folder-hover))) * 100%), transparent);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children > .tree-item.nav-folder > .nav-folder-title {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-bg-d2c) * 100%), transparent);
  color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d2c) * 100%), transparent);
  --nav-collapse-icon-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d2c) * 100%), transparent);
  --icon-color: var(--nav-collapse-icon-color);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children > .tree-item.nav-folder > .nav-folder-title:hover {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(min(1, calc(var(--rtf-bg-d2c) * var(--rt-folder-hover))) * 100%), transparent);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item.nav-folder > .nav-folder-title {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-bg-d3c) * 100%), transparent);
  color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d3c) * 100%), transparent);
  --nav-collapse-icon-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d3c) * 100%), transparent);
  --icon-color: var(--nav-collapse-icon-color);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item.nav-folder > .nav-folder-title:hover {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(min(1, calc(var(--rtf-bg-d3c) * var(--rt-folder-hover))) * 100%), transparent);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item.nav-folder > .nav-folder-title {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-bg-d4c) * 100%), transparent);
  color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d4c) * 100%), transparent);
  --nav-collapse-icon-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d4c) * 100%), transparent);
  --icon-color: var(--nav-collapse-icon-color);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item.nav-folder > .nav-folder-title {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-bg-d5c) * 100%), transparent);
  color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d5c) * 100%), transparent);
  --nav-collapse-icon-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d5c) * 100%), transparent);
  --icon-color: var(--nav-collapse-icon-color);
}
.nav-files-container > div > .tree-item.nav-folder .tree-item-children .tree-item-children .tree-item-children .tree-item-children .tree-item-children .tree-item-children .tree-item.nav-folder .nav-folder-title {
  background-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-bg-d6c) * 100%), transparent);
  color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d6c) * 100%), transparent);
  --nav-collapse-icon-color: color-mix(in oklab, rgb(var(--rt-folder-rgb)) calc(var(--rtf-tx-d6c) * 100%), transparent);
  --icon-color: var(--nav-collapse-icon-color);
}`;

const INDENTATION_GUIDES_CSS = `
.workspace-leaf-content[data-type="file-explorer"] .nav-files-container {
  --indentation-guide-width: calc(var(--rt-guide-width) * 1px);
  --nav-indentation-guide-width: calc(var(--rt-guide-width) * 1px);
}
.nav-files-container .tree-item,
.nav-files-container .tree-item-children {
  --indentation-guide-color: var(--indentation-guide-color, rgba(127,127,127,0.35));
  --nav-indentation-guide-color: var(--nav-indentation-guide-color, rgba(127,127,127,0.35));
}
.nav-files-container > div > .tree-item.nav-folder,
.nav-files-container > div > .tree-item.nav-folder > .nav-folder-title,
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children {
  --rt-guide-base: rgb(var(--rt-folder-rgb));
}
.nav-files-container > div > .tree-item.nav-folder {
  --indentation-guide-color: color-mix(in oklab, var(--rt-guide-base) calc(var(--rtgc-d0) * 100%), transparent);
  --nav-indentation-guide-color: var(--indentation-guide-color);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children {
  --indentation-guide-color: color-mix(in oklab, var(--rt-guide-base) calc(var(--rtgc-d1) * 100%), transparent);
  --nav-indentation-guide-color: var(--indentation-guide-color);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children {
  --indentation-guide-color: color-mix(in oklab, var(--rt-guide-base) calc(var(--rtgc-d2) * 100%), transparent);
  --nav-indentation-guide-color: var(--indentation-guide-color);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children {
  --indentation-guide-color: color-mix(in oklab, var(--rt-guide-base) calc(var(--rtgc-d3) * 100%), transparent);
  --nav-indentation-guide-color: var(--indentation-guide-color);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children {
  --indentation-guide-color: color-mix(in oklab, var(--rt-guide-base) calc(var(--rtgc-d4) * 100%), transparent);
  --nav-indentation-guide-color: var(--indentation-guide-color);
}
.nav-files-container > div > .tree-item.nav-folder > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children > .tree-item > .tree-item-children {
  --indentation-guide-color: color-mix(in oklab, var(--rt-guide-base) calc(var(--rtgc-d5) * 100%), transparent);
  --nav-indentation-guide-color: var(--indentation-guide-color);
}
.nav-files-container > div > .tree-item.nav-folder .tree-item-children .tree-item-children .tree-item-children .tree-item-children .tree-item-children .tree-item-children {
  --indentation-guide-color: color-mix(in oklab, var(--rt-guide-base) calc(var(--rtgc-d6) * 100%), transparent);
  --nav-indentation-guide-color: var(--indentation-guide-color);
}
.workspace-leaf-content[data-type="file-explorer"] .nav-files-container.mod-indentation-guide .tree-item::before,
.workspace-leaf-content[data-type="file-explorer"] .nav-files-container.mod-indentation-guide .tree-item-children::before {
  border-left-color: var(--indentation-guide-color) !important;
  border-color: var(--indentation-guide-color) !important;
  width: var(--indentation-guide-width) !important;
}
.nav-files-container .nav-folder-title:hover {
  --indentation-guide-color: color-mix(in oklab, var(--rt-guide-base) calc(var(--rt-guide-hover) * 100%), transparent);
  --nav-indentation-guide-color: var(--indentation-guide-color);
}`;

const RAINBOW_HEADINGS_CSS = `
.markdown-preview-view h1 { color: var(--xdvc-rainbow-h1); }
.markdown-preview-view h2 { color: var(--xdvc-rainbow-h2); }
.markdown-preview-view h3 { color: var(--xdvc-rainbow-h3); }
.markdown-preview-view h4 { color: var(--xdvc-rainbow-h4); }
.markdown-preview-view h5 { color: var(--xdvc-rainbow-h5); }
.markdown-preview-view h6 { color: var(--xdvc-rainbow-h6); }
.cm-s-obsidian span.cm-header-1 { color: var(--xdvc-rainbow-h1); }
.cm-s-obsidian span.cm-header-2 { color: var(--xdvc-rainbow-h2); }
.cm-s-obsidian span.cm-header-3 { color: var(--xdvc-rainbow-h3); }
.cm-s-obsidian span.cm-header-4 { color: var(--xdvc-rainbow-h4); }
.cm-s-obsidian span.cm-header-5 { color: var(--xdvc-rainbow-h5); }
.cm-s-obsidian span.cm-header-6 { color: var(--xdvc-rainbow-h6); }`;

const EMPHASIS_COLORS_CSS = `
.markdown-preview-view em,
.markdown-preview-view i {
  color: var(--xdvc-em-italic-color);
}
.markdown-preview-view strong,
.markdown-preview-view b {
  color: var(--xdvc-em-bold-color);
}
.markdown-preview-view strong em,
.markdown-preview-view strong i,
.markdown-preview-view em strong,
.markdown-preview-view i b {
  color: var(--xdvc-em-bold-italic-color);
}
.markdown-preview-view u,
.markdown-preview-view ins {
  text-decoration-color: var(--xdvc-em-underline-color);
}
body.xdvc-em-underline-override .markdown-preview-view u,
body.xdvc-em-underline-override .markdown-preview-view ins,
body.xdvc-em-underline-override .markdown-preview-view u em,
body.xdvc-em-underline-override .markdown-preview-view u strong {
  color: var(--xdvc-em-underline-color);
}
.markdown-source-view.mod-cm6 .cm-em {
  color: var(--xdvc-em-italic-color);
}
.markdown-source-view.mod-cm6 .cm-strong {
  color: var(--xdvc-em-bold-color);
}
.markdown-source-view.mod-cm6 .cm-strong.cm-em {
  color: var(--xdvc-em-bold-italic-color);
}
.markdown-source-view.mod-cm6 u,
.markdown-source-view.mod-cm6 ins {
  text-decoration-color: var(--xdvc-em-underline-color);
}
body.xdvc-em-underline-override .markdown-source-view.mod-cm6 u,
body.xdvc-em-underline-override .markdown-source-view.mod-cm6 ins,
body.xdvc-em-underline-override .markdown-source-view.mod-cm6 u * {
  color: var(--xdvc-em-underline-color);
}
body.xdvc-em-keep-link-color :is(.markdown-preview-view, .markdown-source-view.mod-cm6) :is(em, strong, u, ins) a {
  color: var(--link-color, var(--link-external-color, inherit)) !important;
}`;

const LINK_STYLES_CSS = `
body {
  --link-color: var(--xdvc-link-internal-color);
  --link-color-hover: var(--xdvc-link-internal-hover-color);
  --link-external-color: var(--xdvc-link-external-color);
  --link-external-color-hover: var(--xdvc-link-external-hover-color);
  --link-unresolved-color: var(--xdvc-link-dead-color);
  --link-unresolved-opacity: 1;
}
.markdown-source-view .cm-link:not(.cm-formatting),
.markdown-source-view .cm-url,
.markdown-preview-view .external-link {
  color: var(--xdvc-link-external-color) !important;
  text-decoration: underline !important;
}
.markdown-source-view .cm-link:not(.cm-formatting):hover,
.markdown-source-view .cm-url:hover,
.markdown-preview-view .external-link:hover {
  color: var(--xdvc-link-external-hover-color) !important;
}
.markdown-source-view .cm-link:not(.cm-formatting):not(.cm-url)::before,
.markdown-preview-view .external-link::before {
  content: "🔗";
  margin-right: 4px;
  display: inline-block;
  text-decoration: none;
  color: transparent !important;
  text-shadow: 0 0 0 var(--xdvc-link-external-color) !important;
}
.markdown-source-view .cm-link:not(.cm-formatting):not(.cm-url):hover::before,
.markdown-preview-view .external-link:hover::before {
  text-shadow: 0 0 0 var(--xdvc-link-external-hover-color) !important;
}
.markdown-source-view .cm-hmd-internal-link,
.markdown-preview-view .internal-link {
  color: var(--xdvc-link-internal-color) !important;
  text-decoration: none !important;
}
.markdown-source-view .cm-hmd-internal-link:hover,
.markdown-preview-view .internal-link:hover {
  color: var(--xdvc-link-internal-hover-color) !important;
}
.markdown-source-view .cm-hmd-internal-link:not(.cm-formatting):not(.is-unresolved)::before,
.markdown-preview-view .internal-link:not(.is-unresolved)::before {
  content: "📃";
  margin-right: 4px;
  display: inline-block;
  color: transparent !important;
  text-shadow: 0 0 0 var(--xdvc-link-internal-color) !important;
}
.markdown-source-view .cm-hmd-internal-link:not(.cm-formatting):not(.is-unresolved):hover::before,
.markdown-preview-view .internal-link:hover::before {
  text-shadow: 0 0 0 var(--xdvc-link-internal-hover-color) !important;
}
.markdown-source-view .cm-hmd-internal-link.is-unresolved,
.markdown-preview-view .internal-link.is-unresolved {
  color: var(--xdvc-link-dead-color) !important;
  opacity: 1 !important;
}
.markdown-source-view .cm-hmd-internal-link.is-unresolved::before,
.markdown-preview-view .internal-link.is-unresolved::before {
  display: none !important;
}
body.xdvc-hide-link-icons-on-active-line .cm-line.cm-active .cm-link::before,
body.xdvc-hide-link-icons-on-active-line .cm-line.cm-active .cm-hmd-internal-link::before {
  display: none !important;
}`;

const TABLE_STYLES_CSS = `
.markdown-source-view.mod-cm6 .cm-content .cm-table-widget {
  width: 100% !important;
  max-width: 100% !important;
  display: block !important;
  margin: 1em 0 !important;
}
.markdown-source-view.mod-cm6 .cm-content .cm-table-widget .table-wrapper {
  width: 100% !important;
  margin: 0 !important;
}
:is(.markdown-preview-view, .markdown-rendered, .markdown-source-view.mod-cm6) table {
  width: 100% !important;
  max-width: 100% !important;
  table-layout: auto;
}
.theme-light .markdown-preview-view table:not(.dataview):not(.dataview-table) thead th,
.theme-light .markdown-rendered table:not(.dataview):not(.dataview-table) thead th,
.theme-light .cm-content table:not(.dataview):not(.dataview-table) thead th,
.theme-light .markdown-source-view table:not(.dataview):not(.dataview-table) thead th,
.theme-dark .markdown-preview-view table:not(.dataview):not(.dataview-table) thead th,
.theme-dark .markdown-rendered table:not(.dataview):not(.dataview-table) thead th,
.theme-dark .cm-content table:not(.dataview):not(.dataview-table) thead th,
.theme-dark .markdown-source-view table:not(.dataview):not(.dataview-table) thead th {
  background: var(--xdvc-table-header-bg) !important;
  color: var(--xdvc-table-header-text) !important;
  background-image: none !important;
  border-bottom: 2px solid var(--background-modifier-border) !important;
  padding: 10px 15px !important;
  opacity: 1 !important;
  z-index: 1;
}
.theme-light .markdown-preview-view table:not(.dataview):not(.dataview-table) tbody tr:hover td,
.theme-light .markdown-rendered table:not(.dataview):not(.dataview-table) tbody tr:hover td,
.theme-light .cm-content table:not(.dataview):not(.dataview-table) tbody tr:hover td,
.theme-light .markdown-source-view table:not(.dataview):not(.dataview-table) tbody tr:hover td,
.theme-dark .markdown-preview-view table:not(.dataview):not(.dataview-table) tbody tr:hover td,
.theme-dark .markdown-rendered table:not(.dataview):not(.dataview-table) tbody tr:hover td,
.theme-dark .cm-content table:not(.dataview):not(.dataview-table) tbody tr:hover td,
.theme-dark .markdown-source-view table:not(.dataview):not(.dataview-table) tbody tr:hover td {
  background-color: var(--xdvc-table-hover-color) !important;
  transition: background-color 0.15s ease;
}
.theme-light .markdown-preview-view table:not(.dataview):not(.dataview-table),
.theme-light .markdown-rendered table:not(.dataview):not(.dataview-table),
.theme-light .cm-content table:not(.dataview):not(.dataview-table),
.theme-light .markdown-source-view table:not(.dataview):not(.dataview-table),
.theme-dark .markdown-preview-view table:not(.dataview):not(.dataview-table),
.theme-dark .markdown-rendered table:not(.dataview):not(.dataview-table),
.theme-dark .cm-content table:not(.dataview):not(.dataview-table),
.theme-dark .markdown-source-view table:not(.dataview):not(.dataview-table) {
  border-width: var(--xdvc-table-border-width) !important;
}
:is(.markdown-preview-view, .markdown-rendered, .markdown-source-view.mod-cm6) table code {
  background-color: rgba(255, 255, 255, 0.08) !important;
  padding: 2px 6px !important;
  border-radius: 4px;
  font-family: var(--font-monospace);
}`;

const TABLE_BORDERS_CSS = `
.markdown-preview-view,
.markdown-rendered,
.markdown-source-view.mod-cm6,
.cm-html-embed {
  --table-border-color: var(--xdvc-table-border-color) !important;
  --table-border-width: var(--xdvc-table-border-width) !important;
  --table-header-border-color: var(--xdvc-table-border-color) !important;
  --table-header-border-width: var(--xdvc-table-border-width) !important;
  --table-row-last-border-color: var(--xdvc-table-border-color) !important;
  --table-row-last-border-width: var(--xdvc-table-border-width) !important;
  --table-row-first-border-color: var(--xdvc-table-border-color) !important;
  --table-row-first-top-border-width: var(--xdvc-table-border-width) !important;
}
.markdown-preview-view table,
.markdown-rendered table,
.markdown-source-view.mod-cm6 table,
.markdown-source-view.mod-cm6 .table-wrapper table,
.markdown-source-view.mod-cm6 .cm-table-widget table,
.markdown-source-view.mod-cm6 .table-editor table,
.cm-html-embed table,
.table-wrapper table,
.cm-table-widget table,
.table-editor table,
.el-table table {
  border-collapse: collapse !important;
  border-spacing: 0 !important;
  border: var(--xdvc-table-border-width) solid var(--xdvc-table-border-color) !important;
}
.markdown-preview-view table thead,
.markdown-preview-view table tbody,
.markdown-preview-view table tr,
.markdown-preview-view table th,
.markdown-preview-view table td,
.markdown-rendered table thead,
.markdown-rendered table tbody,
.markdown-rendered table tr,
.markdown-rendered table th,
.markdown-rendered table td,
.markdown-source-view.mod-cm6 table thead,
.markdown-source-view.mod-cm6 table tbody,
.markdown-source-view.mod-cm6 table tr,
.markdown-source-view.mod-cm6 table th,
.markdown-source-view.mod-cm6 table td,
.cm-html-embed table thead,
.cm-html-embed table tbody,
.cm-html-embed table tr,
.cm-html-embed table th,
.cm-html-embed table td,
.table-wrapper table thead,
.table-wrapper table tbody,
.table-wrapper table tr,
.table-wrapper table th,
.table-wrapper table td,
.cm-table-widget table thead,
.cm-table-widget table tbody,
.cm-table-widget table tr,
.cm-table-widget table th,
.cm-table-widget table td,
.table-editor table thead,
.table-editor table tbody,
.table-editor table tr,
.table-editor table th,
.table-editor table td,
.el-table table thead,
.el-table table tbody,
.el-table table tr,
.el-table table th,
.el-table table td {
  border-color: var(--xdvc-table-border-color) !important;
}
.markdown-preview-view table th,
.markdown-preview-view table td,
.markdown-rendered table th,
.markdown-rendered table td,
.markdown-source-view.mod-cm6 table th,
.markdown-source-view.mod-cm6 table td,
.cm-html-embed table th,
.cm-html-embed table td,
.table-wrapper table th,
.table-wrapper table td,
.cm-table-widget table th,
.cm-table-widget table td,
.table-editor table th,
.table-editor table td,
.el-table table th,
.el-table table td {
  border: var(--xdvc-table-border-width) solid var(--xdvc-table-border-color) !important;
  border-left: var(--xdvc-table-border-width) solid var(--xdvc-table-border-color) !important;
  border-right: var(--xdvc-table-border-width) solid var(--xdvc-table-border-color) !important;
  border-top: var(--xdvc-table-border-width) solid var(--xdvc-table-border-color) !important;
  border-bottom: var(--xdvc-table-border-width) solid var(--xdvc-table-border-color) !important;
}`;

const ONE_DARK_PLUS_CSS = `
.markdown-source-view.mod-cm6 .HyperMD-codeblock,
.markdown-preview-view pre code {
  background-color: var(--xdvc-vs-bg) !important;
  color: var(--xdvc-vs-fg) !important;
  font-family: Consolas, 'Courier New', monospace !important;
}
.markdown-preview-view pre code {
  display: block;
  padding: 12px !important;
  border-radius: 4px;
  border: 1px solid #2d2d2d;
}
.cm-comment, .token.comment { color: var(--xdvc-vs-comment) !important; }
.cm-string, .token.string { color: var(--xdvc-vs-string) !important; }
.cm-number, .token.number { color: var(--xdvc-vs-number) !important; }
.cm-keyword, .token.keyword { color: var(--xdvc-vs-keyword-control) !important; }
.cm-type, .token.builtin, .token.class-name, .cm-builtin { color: var(--xdvc-vs-keyword-type) !important; }
.cm-variable-3 { color: var(--xdvc-vs-keyword-type) !important; }
.cm-def, .token.function { color: var(--xdvc-vs-function) !important; }
.cm-variable, .token.variable, .cm-variable-2 { color: var(--xdvc-vs-variable) !important; }
.cm-meta, .token.macro { color: var(--xdvc-vs-macro) !important; }
.cm-operator, .token.operator { color: var(--xdvc-vs-fg) !important; }
.cm-type { color: var(--xdvc-vs-keyword-type) !important; }`;

const EDITOR_FULL_CSS = `
.editor-full {
  --file-line-width: var(--xdvc-editor-full-width);
  --line-width: var(--xdvc-editor-full-width);
  --container-img-width: 100%;
  --table-wrapper-width: 100%;
}`;

const AUTO_ATTRIBUTE_HIDE_CSS = `
.markdown-preview-view .metadata-container,
.markdown-source-view .metadata-container {
  max-height: var(--xdvc-metadata-collapsed-height);
  opacity: var(--xdvc-metadata-collapsed-opacity);
  overflow: hidden;
  transition: max-height 250ms ease-in-out, opacity 250ms;
  margin-bottom: 0;
}
.markdown-preview-view .metadata-container:hover,
.markdown-source-view .metadata-container:hover,
.markdown-preview-view .metadata-container:focus-within,
.markdown-source-view .metadata-container:focus-within {
  max-height: 1000px;
  opacity: 1;
  transition: max-height 300ms ease-in-out, opacity 300ms;
}`;

const MATH_BLOCK_WHITE_CSS = `
.markdown-preview-view .math-block,
.markdown-source-view.mod-cm6 .math-block {
  background: var(--xdvc-math-block-bg) !important;
  color: var(--xdvc-math-block-text) !important;
  padding: 0.6em 0.8em;
  border-radius: 8px;
  margin: 0.8em 0;
}
.markdown-preview-view .math-block .katex,
.markdown-preview-view .math-block .katex *,
.markdown-source-view.mod-cm6 .math-block .katex,
.markdown-source-view.mod-cm6 .math-block .katex * {
  color: var(--xdvc-math-block-text) !important;
}
.markdown-preview-view .math-block .katex-display,
.markdown-source-view.mod-cm6 .math-block .katex-display {
  margin: 0 !important;
}`;

module.exports = XDVisualCorePlugin;
