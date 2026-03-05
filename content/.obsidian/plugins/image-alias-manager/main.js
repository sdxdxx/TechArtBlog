/* Image Alias Manager – v1.16.1 (All-in-One, 含“标题剪裁/前缀清洗/Markdown 链接空格修复 + Markdown 尺寸写入 alt”，并修复统一宽度解析)
 * 功能汇总：
 * 1) 别名：按“最近标题/层级路径”生成；支持整篇/选区；支持模板 {h1..h6}/{headingPath}/{index} 等
 * 2) 清除：一键清除所有别名（wikilink 的别名、Markdown/HTML 的 alt）；支持整篇/选区
 * 3) 尺寸：一键统一宽度（默认 1000），可选“自动高度=按原图等比计算”；支持整篇/选区
 * 4) 标题预处理：① 标题剪裁正则（仅第一次匹配前的内容 + 匹配本身被剪掉）② 标题前缀通用清洗正则（多条、顺序执行）
 * —— 全部“离屏 vault.modify”实现，避免 Live Preview 事务，稳妥不报错。
 */
const { Plugin, Notice, PluginSettingTab, Setting, MarkdownView, TFile } = require("obsidian");

/** ---------------- Defaults ---------------- */
const DEFAULT_SETTINGS = {
    // 生成别名相关
    enableWikilink: true,               // 处理 ![[...]]
    enableMarkdown: false,              // 处理 ![]() / <img>（仅 alt/尺寸；不强制把 ![]() 转成 <img>）
    imageExtensions: "png,jpg,jpeg,gif,webp,avif,svg",
    aliasTemplate: "{headingPath}_{index}",       // 有标题：层级路径 + 序号
    fallbackWhenNoHeading: "{fileBase}_{index}",  // 无标题：笔记名 + 序号
    headingPathSep: "_",
    trimAlias: true,
    replaceIllegal: true,
    addIndexWhenHeading: true,
    addIndexWhenNoHeading: true,

    // 标题预处理
    // A) 标题剪裁：仅“第一次匹配”前（含匹配本身）被去掉，如 "一、基本" 通过“、”剪裁为 "基本"
    headingCutPattern: "、",            // 留空则不剪裁
    // B) 通用前缀清洗：多条正则按顺序执行；每条仅去掉“标题开头”的一次匹配（无需写 ^，插件会自动加锚定）
    //   示例（每行一条）：
    //   ^第[一二三十百千0-9]+[章节篇卷]\s*
    //   Step\s*\d+\s*:\s*
    headingPrefixStripRules: "",

    // 清除范围
    clearAliasForWikilink: true,        // 清 wikilink 的别名（保留尺寸）
    clearAltForMarkdown: true,          // 清 Markdown/HTML 的 alt

    // 统一尺寸
    uniformWidth: 1000,                 // 默认统一宽度
    uniformAlsoSetHeight: false,        // 是否写入高度（按原图等比计算）；默认否
    uniformAffectsWikilink: true,       // 对 ![[...]] 应用
    // ✅ 对 Markdown ![]() 应用（把尺寸写进 alt，以 |W / |WxH）
    uniformAffectsMarkdownAlt: true,
    // 对 <img> 应用（写 width/height）；默认关以避免影响页面排版
    uniformAffectsMarkdown: false
};

/** ---------------- Small utils ---------------- */
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
function toExtSet(csv) { return new Set(String(csv || "").split(/[,\s]+/).map(s => s.trim().toLowerCase()).filter(Boolean)); }
function hasAllowedImageExt(path, exts) {
    const m = /\.([a-z0-9]+)(?:[#?][^]*)?$/i.exec(path || "");
    return !!(m && exts.has(m[1].toLowerCase()));
}
function parseHeadingWithLevel(line) {
    const m = /^\s{0,3}(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!m) return null;
    const level = m[1].length;
    let txt = m[2].replace(/\s#+\s*$/, "").trim();
    if (!txt) return null;
    return { level, text: txt };
}
function isSizeToken(s) { return /^\s*\d+\s*(x\s*\d+)?\s*$/.test(s || ""); }
function escapeHtmlAttr(s) { return String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

/** ⭐ 新增：更鲁棒的宽度解析（支持 800 / 800px /  800  / 全角 ８００ ） */
function toAsciiDigits(s) {
    return String(s || "").replace(/[０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));
}
function parseWidthValue(v, def = 1000) {
    const s = toAsciiDigits(String(v || "")).trim();
    const m = s.match(/(\d{1,6})/);
    const n = m ? parseInt(m[1], 10) : NaN;
    return Number.isFinite(n) && n > 0 ? n : def;
}

/** ✅ 当 () 内部使用 <...> 包裹且文件名含空格时，取第一个 '>' 前为 URL */
function extractMdUrlForCheck(srcInsideParen) {
    let s = String(srcInsideParen || "").trim();
    if (s.startsWith("<")) {
        const gt = s.indexOf(">");
        if (gt !== -1) {
            // 允许形式：<url 含空格> 或 <url 含空格> "title"
            return s.slice(1, gt).trim();
        }
    }
    // 非尖括号形式，取第一个非空白片段（若后面跟 title）
    const m = /^(\S+)/.exec(s);
    return m ? m[1] : s;
}

/** 用 exec 循环实现的 replaceAll（支持全局多次命中） */
function replaceAllExec(str, regex, replacer) {
    const r = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : regex.flags + "g");
    let out = "", last = 0, m;
    while ((m = r.exec(str)) !== null) {
        out += str.slice(last, m.index) + replacer(...m);
        last = m.index + m[0].length;
        if (m.index === r.lastIndex) r.lastIndex++; // 防止零宽死循环
    }
    out += str.slice(last);
    return out;
}

/** 逐字符扫描并替换一行中的所有 Markdown 图片 ![alt](...)
 * callback(full, alt, inside) => replacementString | null/undefined(表示不替换)
 */
function replaceAllMarkdownImages(line, callback) {
    let out = "", i = 0;
    while (i < line.length) {
        const start = line.indexOf("![", i);
        if (start === -1) { out += line.slice(i); break; }

        const mid = line.indexOf("](", start + 2);
        if (mid === -1) { out += line.slice(i); break; }

        // 从 "](" 后开始寻找与之配对的右括号 )，支持嵌套括号与引号
        let j = mid + 2, depth = 1, inQuote = null;
        while (j < line.length) {
            const ch = line[j];
            if (inQuote) {
                if (ch === inQuote && line[j - 1] !== '\\') inQuote = null;
            } else {
                if (ch === '"' || ch === "'") inQuote = ch;
                else if (ch === '(') depth++;
                else if (ch === ')') { depth--; if (depth === 0) break; }
            }
            j++;
        }
        if (depth !== 0) { out += line.slice(i); break; } // 没找到配对的 ')'

        const full = line.slice(start, j + 1);
        const alt = line.slice(start + 2, mid);
        const inside = line.slice(mid + 2, j);

        const rep = callback(full, alt, inside);
        out += line.slice(i, start) + (rep == null ? full : rep);
        i = j + 1;
    }
    return out;
}

/** 异步版（需要 await 尺寸） */
async function replaceAllMarkdownImagesAsync(line, asyncCallback) {
    let out = "", i = 0;
    while (i < line.length) {
        const start = line.indexOf("![", i);
        if (start === -1) { out += line.slice(i); break; }
        const mid = line.indexOf("](", start + 2);
        if (mid === -1) { out += line.slice(i); break; }

        let j = mid + 2, depth = 1, inQuote = null;
        while (j < line.length) {
            const ch = line[j];
            if (inQuote) {
                if (ch === inQuote && line[j - 1] !== '\\') inQuote = null;
            } else {
                if (ch === '"' || ch === "'") inQuote = ch;
                else if (ch === '(') depth++;
                else if (ch === ')') { depth--; if (depth === 0) break; }
            }
            j++;
        }
        if (depth !== 0) { out += line.slice(i); break; }

        const full = line.slice(start, j + 1);
        const alt = line.slice(start + 2, mid);
        const inside = line.slice(mid + 2, j);

        const rep = await asyncCallback(full, alt, inside);
        out += line.slice(i, start) + (rep == null ? full : rep);
        i = j + 1;
    }
    return out;
}

/** ---------- image dimension parsers (PNG/JPEG/GIF/WebP) ---------- */
function bytesToU32BE(a, i) { return (a[i] << 24) | (a[i + 1] << 16) | (a[i + 2] << 8) | a[i + 3]; }
function bytesToU16BE(a, i) { return (a[i] << 8) | a[i + 1]; }
function bytesToU16LE(a, i) { return (a[i]) | (a[i + 1] << 8); }
function parsePNG(a) { if (a[0] !== 0x89 || a[1] !== 0x50 || a[2] !== 0x4E || a[3] !== 0x47) return null; return { width: bytesToU32BE(a, 16), height: bytesToU32BE(a, 20) }; }
function parseGIF(a) { if (a[0] !== 0x47 || a[1] !== 0x49 || a[2] !== 0x46) return null; return { width: bytesToU16LE(a, 6), height: bytesToU16LE(a, 8) }; }
function parseJPG(a) {
    if (!(a[0] === 0xFF && a[1] === 0xD8)) return null; let i = 2;
    while (i < a.length) {
        if (a[i] !== 0xFF) { i++; continue; } const marker = a[i + 1];
        if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
            const h = bytesToU16BE(a, i + 5), w = bytesToU16BE(a, i + 7); return { width: w, height: h };
        } else { const len = bytesToU16BE(a, i + 2); i += 2 + len; }
    } return null;
}
function parseWebP(a) {
    if (!(a[0] === 0x52 && a[1] === 0x49 && a[2] === 0x46 && a[3] === 0x46)) return null;
    if (!(a[8] === 0x57 && a[9] === 0x45 && a[10] === 0x42 && a[11] === 0x50)) return null;
    let i = 12; while (i + 8 <= a.length) {
        const tag = String.fromCharCode(a[i], a[i + 1], a[i + 2], a[i + 3]); i += 4;
        const size = a[i] | (a[i + 1] << 8) | (a[i + 2] << 16) | (a[i + 3] << 24); i += 4;
        if (tag === "VP8X" && i + 10 <= a.length) { const w = 1 + (a[i + 4] | (a[i + 5] << 8) | (a[i + 6] << 16)); const h = 1 + (a[i + 7] | (a[i + 8] << 8) | (a[i + 9] << 16)); return { width: w, height: h }; }
        if (tag === "VP8L" && i + 5 <= a.length) {
            if (a[i] !== 0x2F) { i += size + (size & 1); continue; }
            const b1 = a[i + 1], b2 = a[i + 2], b3 = a[i + 3], b4 = a[i + 4];
            const w = (b1 | ((b2 & 0x3F) << 8)) + 1, h = (((b2 >> 6) | (b3 << 2) | ((b4 & 0x0F) << 10))) + 1; return { width: w, height: h };
        }
        i += size + (size & 1);
    } return null;
}
function sniffDimensions(uint8) { return parsePNG(uint8) || parseJPG(uint8) || parseGIF(uint8) || parseWebP(uint8) || null; }

/** ---------------- 标题预处理（剪裁 + 通用前缀清洗） ---------------- */
function cutHeadingByPattern(txt, patternStr) {
    try {
        if (!patternStr || !patternStr.trim()) return txt;
        const re = new RegExp(patternStr);       // 不加 g，只取“首次匹配”
        const m = re.exec(txt);
        if (!m) return txt;
        const cutIdx = m.index + m[0].length;
        return txt.slice(cutIdx).trim();
    } catch { return txt; }
}
function stripHeadingPrefixes(txt, rulesStr) {
    const rules = String(rulesStr || "")
        .split(/\r?\n/)
        .map(s => s.trim())
        .filter(Boolean);
    let s = txt;
    for (const raw of rules) {
        try {
            const pat = raw.startsWith("^") ? raw : `^(?:${raw})`;
            const re = new RegExp(pat);
            const m = re.exec(s);
            if (m) s = s.slice(m[0].length).trim();
        } catch {/* 忽略坏正则 */ }
    }
    return s;
}
function preprocessHeading(txt, settings) {
    let s = txt;
    s = cutHeadingByPattern(s, settings.headingCutPattern);
    s = stripHeadingPrefixes(s, settings.headingPrefixStripRules);
    return s;
}

/** ---------------- Alias generation ---------------- */
function processText_addAliases(text, fileBase, settings) {
    const exts = toExtSet(settings.imageExtensions);
    const lines = text.split("\n");

    const H = [null, null, null, null, null, null]; // h1..h6（已预处理后的标题）
    let currentLevel = 0;
    let indexUnderHeading = 0, indexWithoutHeading = 0, changed = 0;

    function headingPath() {
        const parts = [];
        for (let i = 0; i < currentLevel; i++) { if (H[i]) parts.push(H[i]); }
        return parts.join(settings.headingPathSep || "_");
    }
    function buildAlias({ hasHeading, index }) {
        const tpl = hasHeading ? settings.aliasTemplate : settings.fallbackWhenNoHeading;
        let alias = String(tpl || "")
            .replaceAll("{nearestHeading}", currentLevel > 0 ? (H[currentLevel - 1] || "") : "")
            .replaceAll("{h1}", H[0] || "").replaceAll("{h2}", H[1] || "")
            .replaceAll("{h3}", H[2] || "").replaceAll("{h4}", H[3] || "")
            .replaceAll("{h5}", H[4] || "").replaceAll("{h6}", H[5] || "")
            .replaceAll("{headingPath}", headingPath())
            .replaceAll("{level}", currentLevel ? String(currentLevel) : "")
            .replaceAll("{fileBase}", fileBase || "")
            .replaceAll("{index}", index !== undefined ? String(index) : "");
        if (settings.trimAlias) alias = alias.trim();
        if (settings.replaceIllegal) alias = alias.replace(/[\r\n\t\f\v\|\[\]]+/g, " ").replace(/\s{2,}/g, " ").trim();
        return alias;
    }

    for (let i = 0; i < lines.length; i++) {
        const raw = lines[i];
        const hh = parseHeadingWithLevel(raw);
        if (hh) {
            const cleaned = preprocessHeading(hh.text, settings);
            H[hh.level - 1] = cleaned;
            for (let k = hh.level; k < 6; k++) H[k] = null;
            currentLevel = hh.level;
            indexUnderHeading = 0;
            continue;
        }

        let line = raw;

        // 1) wikilink
        if (settings.enableWikilink) {
            const re = /!\[\[([^\]\|\n]+)(?:\|([^\]]*))?\]\]/g;
            line = replaceAllExec(line, re, (full, target, restRaw) => {
                target = String(target || "").trim();
                if (!hasAllowedImageExt(target, exts)) return full;

                const parts = restRaw ? String(restRaw).split("|") : [];
                let size;
                for (const p of parts) { const t = (p || "").trim(); if (!t) continue; if (isSizeToken(t)) { size = size ?? t; } }
                const haveHeading = currentLevel > 0;
                const index = haveHeading ? (settings.addIndexWhenHeading ? indexUnderHeading + 1 : undefined)
                    : (settings.addIndexWhenNoHeading ? indexWithoutHeading + 1 : undefined);
                const alias = buildAlias({ hasHeading: haveHeading, index });
                if (haveHeading) indexUnderHeading++; else indexWithoutHeading++;
                const newRest = [alias, size].filter(Boolean).join("|");
                const rep = `![[${target}${newRest ? "|" + newRest : ""}]]`;
                if (rep !== full) changed++;
                return rep;
            });
        }

        // 2) Markdown & HTML（别名阶段仅写 alt，不涉及尺寸）
        if (settings.enableMarkdown) {
            // 2.1 Markdown
            line = replaceAllMarkdownImages(line, (full, _alt, srcInside) => {
                const urlForCheck = extractMdUrlForCheck(srcInside);
                if (!hasAllowedImageExt(urlForCheck, exts)) return null;
                const haveHeading = currentLevel > 0;
                const index = haveHeading ? (settings.addIndexWhenHeading ? indexUnderHeading + 1 : undefined)
                    : (settings.addIndexWhenNoHeading ? indexWithoutHeading + 1 : undefined);
                const alias = buildAlias({ hasHeading: haveHeading, index });
                if (haveHeading) indexUnderHeading++; else indexWithoutHeading++;
                return `![${escapeHtmlAttr(alias)}](${srcInside})`;
            });

            // 2.2 HTML <img>
            const htmlImgRe = /<img\b([^>]*?)\bsrc=(["'])([^"'>]+)\2([^>]*)>/gi;
            line = replaceAllExec(line, htmlImgRe, (full, pre, quote, src, post) => {
                const s = String(src || "");
                if (!hasAllowedImageExt(s, exts)) return full;
                const haveHeading = currentLevel > 0;
                const index = haveHeading ? (settings.addIndexWhenHeading ? indexUnderHeading + 1 : undefined)
                    : (settings.addIndexWhenNoHeading ? indexWithoutHeading + 1 : undefined);
                const alias = buildAlias({ hasHeading: haveHeading, index });
                if (haveHeading) indexUnderHeading++; else indexWithoutHeading++;
                let attrs = String((pre || "") + " " + (post || "")).trim();
                if (/\balt\s*=/.test(attrs)) attrs = attrs.replace(/\balt\s*=\s*(["'])(.*?)\1/i, `alt="${escapeHtmlAttr(alias)}"`);
                else attrs = (attrs + ` alt="${escapeHtmlAttr(alias)}"`).trim();
                return `<img ${attrs} src=${quote}${s}${quote}>`;
            });
        }

        lines[i] = line;
    }

    return { text: lines.join("\n"), changed };
}

/** ---------------- Clear aliases ---------------- */
function processText_clearAliases(text, settings) {
    const exts = toExtSet(settings.imageExtensions);
    const lines = text.split("\n");
    let changed = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        const raw = line;

        if (settings.clearAliasForWikilink) {
            const re = /!\[\[([^\]\|\n]+)(?:\|([^\]]*))?\]\]/g;
            line = replaceAllExec(line, re, (full, target, restRaw) => {
                target = String(target || "").trim();
                if (!hasAllowedImageExt(target, exts)) return full;
                let size;
                if (restRaw) {
                    const parts = String(restRaw).split("|");
                    for (const p of parts) { const t = (p || "").trim(); if (!t) continue; if (isSizeToken(t)) { size = size ?? t; } }
                }
                const rep = `![[${target}${size ? "|" + size : ""}]]`;
                if (rep !== full) changed++;
                return rep;
            });
        }

        if (settings.clearAltForMarkdown) {
            // Markdown
            line = replaceAllMarkdownImages(line, (full, _alt, srcInside) => {
                const urlForCheck = extractMdUrlForCheck(srcInside);
                if (!hasAllowedImageExt(urlForCheck, exts)) return null;
                const rep = `![](${srcInside})`;
                if (rep !== full) changed++;
                return rep;
            });
            // HTML <img> alt
            const htmlAltRe = /(<img\b[^>]*?)\s+alt\s*=\s*(["'])(.*?)\2([^>]*>)/gi;
            line = replaceAllExec(line, htmlAltRe, (full, pre, q, _val, post) => {
                return (pre + " " + post).replace(/\s{2,}/g, " ").replace(/\s+>/, ">");
            });
        }

        if (line !== raw) lines[i] = line;
    }

    return { text: lines.join("\n"), changed };
}

/** ---------------- Uniform size ----------------
 *  - wikilink：写入/覆盖 |W 或 |WxH
 *  - Markdown ![]()：把尺寸写到 alt：alt(去尾部旧尺寸) + |W 或 |WxH（不改 () 内部）
 *  - HTML <img>：可选，写 width/height 属性
 */
async function processText_uniformSize(app, text, sourcePath, settings) {
    const exts = toExtSet(settings.imageExtensions);
    const lines = text.split("\n");
    let changed = 0;

    const dimCache = new Map(); // key = TFile.path
    async function getDimsByLink(link) {
        const tfile = app.metadataCache.getFirstLinkpathDest(link, sourcePath);
        if (!(tfile instanceof TFile)) return null;
        if (dimCache.has(tfile.path)) return dimCache.get(tfile.path);
        try {
            const bin = await app.vault.readBinary(tfile);
            const dim = sniffDimensions(new Uint8Array(bin));
            dimCache.set(tfile.path, dim || null);
            return dim;
        } catch { dimCache.set(tfile.path, null); return null; }
    }

    // ⭐ 这里也改为鲁棒解析
    const W = parseWidthValue(settings.uniformWidth, 1000);

    // alt 去掉尾部“|尺寸”
    function stripTrailingSizeFromAlt(alt) {
        const m = /^(.*?)(?:\|\s*\d+(?:\s*x\s*\d+)?)?\s*$/.exec(String(alt || ""));
        return (m ? m[1] : String(alt || "")).trim();
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        const raw = line;

        // 1) wikilink
        if (settings.uniformAffectsWikilink) {
            const re = /!\[\[([^\]\|\n]+)(?:\|([^\]]*))?\]\]/g;
            line = await replaceAsync(line, re, async (full, target, restRaw) => {
                target = String(target || "").trim();
                if (!hasAllowedImageExt(target, exts)) return full;

                let alias = null;
                if (restRaw) {
                    const parts = String(restRaw).split("|");
                    for (const p of parts) {
                        const t = (p || "").trim();
                        if (!t) continue;
                        if (isSizeToken(t)) { /* 覆盖旧尺寸 */ }
                        else { alias = alias ?? t; }
                    }
                }

                let sizeToken = String(W);
                if (settings.uniformAlsoSetHeight) {
                    const dim = await getDimsByLink(target);
                    if (dim && dim.width > 0 && dim.height > 0) {
                        const H = Math.round(dim.height * (W / dim.width));
                        sizeToken = `${W}x${H}`;
                    }
                }

                const newRest = [alias, sizeToken].filter(Boolean).join("|");
                const rep = `![[${target}${newRest ? "|" + newRest : ""}]]`;
                if (rep !== full) changed++;
                return rep;
            });
        }

        // 2) Markdown ![]()：把尺寸写到 alt（不改 () 内部）
        if (settings.uniformAffectsMarkdownAlt) {
            line = await replaceAllMarkdownImagesAsync(line, async (full, alt, srcInside) => {
                const urlForCheck = extractMdUrlForCheck(srcInside);
                if (!hasAllowedImageExt(urlForCheck, exts)) return null;

                let sizeToken = String(W);
                if (settings.uniformAlsoSetHeight) {
                    const dim = await getDimsByLink(urlForCheck);
                    if (dim && dim.width > 0 && dim.height > 0) {
                        const H = Math.round(dim.height * (W / dim.width));
                        sizeToken = `${W}x${H}`;
                    }
                }

                const aliasPart = stripTrailingSizeFromAlt(alt);
                const newAlt = aliasPart ? `${aliasPart}|${sizeToken}` : `|${sizeToken}`;
                const rep = `![${escapeHtmlAttr(newAlt)}](${srcInside})`;
                if (rep !== full) changed++;
                return rep;
            });
        }

        // 3) HTML <img>：写 width/height 属性
        if (settings.uniformAffectsMarkdown) {
            const htmlImgRe = /<img\b([^>]*?)\bsrc=(["'])([^"'>]+)\2([^>]*)>/gi;
            line = await replaceAsync(line, htmlImgRe, async (full, pre, quote, src, post) => {
                const s = String(src || "");
                if (!hasAllowedImageExt(s, exts)) return full;

                let attrs = String((pre || "") + " " + (post || "")).trim();

                let widthAttr = `width="${W}"`, heightAttr = "";
                if (settings.uniformAlsoSetHeight) {
                    const dim = await getDimsByLink(s);
                    if (dim && dim.width > 0 && dim.height > 0) {
                        const H = Math.round(dim.height * (W / dim.width));
                        heightAttr = ` height="${H}"`;
                    }
                }

                // 删除旧 width/height
                attrs = attrs.replace(/\s+(width|height)\s*=\s*(["']).*?\2/gi, "");
                const rep = `<img ${attrs} src=${quote}${s}${quote} ${widthAttr}${heightAttr}>`.replace(/\s{2,}/g, " ").replace(/\s+>/, ">");
                if (rep !== full) changed++;
                return rep;
            });
        }

        if (line !== raw) lines[i] = line;
    }

    return { text: lines.join("\n"), changed };
}

/** helper: async replace for regex with async replacer */
async function replaceAsync(str, regex, asyncFn) {
    const promises = [];
    str.replace(regex, function () { const args = arguments; promises.push(asyncFn.apply(null, args)); return ""; });
    const data = await Promise.all(promises);
    return str.replace(regex, () => data.shift());
}

/** ---------------- Selection helpers ---------------- */
function getSelectionOffsets(editor) {
    const sels = (editor.listSelections && editor.listSelections()) || [];
    const ranges = [];
    for (const s of sels) {
        const a = editor.posToOffset(s.anchor);
        const b = editor.posToOffset(s.head);
        const from = Math.min(a, b), to = Math.max(a, b);
        if (to > from) ranges.push({ from, to });
    }
    if (ranges.length === 0) return [];
    ranges.sort((r1, r2) => r1.from - r2.from);
    const merged = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
        const r = ranges[i], last = merged[merged.length - 1];
        if (r.from <= last.to) { last.to = Math.max(last.to, r.to); }
        else merged.push(r);
    }
    return merged;
}

/** ---------------- Settings UI ---------------- */
class ImageAliasManagerSettingTab extends PluginSettingTab {
    constructor(app, plugin) { super(app, plugin); this.plugin = plugin; }
    display() {
        const { containerEl } = this; containerEl.empty();
        containerEl.createEl("h2", { text: "Image Alias Manager 设置（整合版）" });

        // 基本处理项
        new Setting(containerEl).setName("处理双链语法 ![[...]]")
            .addToggle(t => t.setValue(this.plugin.settings.enableWikilink).onChange(async v => { this.plugin.settings.enableWikilink = v; await this.plugin.saveSettings(); }));

        new Setting(containerEl).setName("处理 Markdown 图片语法 ![]() / <img>")
            .setDesc("若启用：别名写入 alt；尺寸功能可对 Markdown/HTML 生效（见下开关）。")
            .addToggle(t => t.setValue(this.plugin.settings.enableMarkdown).onChange(async v => { this.plugin.settings.enableMarkdown = v; await this.plugin.saveSettings(); }));

        // 白名单
        new Setting(containerEl).setName("附件扩展名白名单（逗号分隔）")
            .addText(t => t.setPlaceholder(DEFAULT_SETTINGS.imageExtensions).setValue(this.plugin.settings.imageExtensions).onChange(async v => { this.plugin.settings.imageExtensions = v; await this.plugin.saveSettings(); }));

        // 模板
        new Setting(containerEl).setName("有标题时的别名模板")
            .setDesc("可用：{nearestHeading}、{h1}…{h6}、{headingPath}、{level}、{fileBase}、{index}")
            .addText(t => t.setPlaceholder(DEFAULT_SETTINGS.aliasTemplate).setValue(this.plugin.settings.aliasTemplate).onChange(async v => { this.plugin.settings.aliasTemplate = v || DEFAULT_SETTINGS.aliasTemplate; await this.plugin.saveSettings(); }));

        new Setting(containerEl).setName("无标题时的别名模板")
            .setDesc("同上变量可用；常用：{fileBase}_{index}")
            .addText(t => t.setPlaceholder(DEFAULT_SETTINGS.fallbackWhenNoHeading).setValue(this.plugin.settings.fallbackWhenNoHeading).onChange(async v => { this.plugin.settings.fallbackWhenNoHeading = v || DEFAULT_SETTINGS.fallbackWhenNoHeading; await this.plugin.saveSettings(); }));

        new Setting(containerEl).setName("层级路径分隔符（用于 {headingPath}）")
            .addText(t => t.setPlaceholder("_").setValue(this.plugin.settings.headingPathSep).onChange(async v => { this.plugin.settings.headingPathSep = v || "_"; await this.plugin.saveSettings(); }));

        // ⭐ 标题预处理
        containerEl.createEl("h3", { text: "标题预处理（仅影响别名生成）" });
        new Setting(containerEl).setName("标题剪裁正则（第一次匹配前的内容将被去掉）")
            .setDesc("例：'、' -> 去掉'一、'；或使用字符集如 '[,，、:：-]'；留空=不剪裁。")
            .addText(t => t.setPlaceholder(DEFAULT_SETTINGS.headingCutPattern).setValue(this.plugin.settings.headingCutPattern).onChange(async v => { this.plugin.settings.headingCutPattern = v ?? ""; await this.plugin.saveSettings(); }));

        new Setting(containerEl).setName("标题前缀通用清洗正则（多条，逐行，顺序执行）")
            .setDesc("每行一条规则，仅清除标题开头的一次匹配（自动加 ^）。示例：\n^第[一二三十百千0-9]+[章节篇卷]\\s*\nStep\\s*\\d+\\s*:\\s*")
            .addTextArea(t => t
                .setPlaceholder("例如：\n^第[一二三十百千0-9]+[章节篇卷]\\s*\n^Part\\s*\\d+\\s*:\\s*\nStep\\s*\\d+\\s*:\\s*")
                .setValue(this.plugin.settings.headingPrefixStripRules)
                .onChange(async v => { this.plugin.settings.headingPrefixStripRules = v; await this.plugin.saveSettings(); })
            );

        // 别名清理
        containerEl.createEl("h3", { text: "别名清理" });
        new Setting(containerEl).setName("去除首尾空白").addToggle(t => t.setValue(this.plugin.settings.trimAlias).onChange(async v => { this.plugin.settings.trimAlias = v; await this.plugin.saveSettings(); }));
        new Setting(containerEl).setName("过滤非法字符（|、[]、换行等）").addToggle(t => t.setValue(this.plugin.settings.replaceIllegal).onChange(async v => { this.plugin.settings.replaceIllegal = v; await this.plugin.saveSettings(); }));
        new Setting(containerEl).setName("清除 Obsidian 双链别名（保留尺寸）").addToggle(t => t.setValue(this.plugin.settings.clearAliasForWikilink).onChange(async v => { this.plugin.settings.clearAliasForWikilink = v; await this.plugin.saveSettings(); }));
        new Setting(containerEl).setName("清除 Markdown/HTML alt").addToggle(t => t.setValue(this.plugin.settings.clearAltForMarkdown).onChange(async v => { this.plugin.settings.clearAltForMarkdown = v; await this.plugin.saveSettings(); }));

        // 统一尺寸
        containerEl.createEl("h3", { text: "统一图片尺寸" });
        new Setting(containerEl).setName("统一宽度（像素）")
            .setDesc("默认 1000；wikilink/Markdown alt 写入 |W 或 |WxH；HTML <img> 可写 width/height。")
            .addText(t => t.setPlaceholder("1000").setValue(String(this.plugin.settings.uniformWidth)).onChange(async v => {
                // ⭐ 使用鲁棒解析，兼容 800 / 800px / ８００ / 含空格
                this.plugin.settings.uniformWidth = parseWidthValue(v, 1000);
                await this.plugin.saveSettings();
            }));
        new Setting(containerEl).setName("同时写入高度（按原图等比计算）")
            .setDesc("打开后统一写成 WxH；否则仅写宽度 W")
            .addToggle(t => t.setValue(this.plugin.settings.uniformAlsoSetHeight).onChange(async v => { this.plugin.settings.uniformAlsoSetHeight = v; await this.plugin.saveSettings(); }));
        new Setting(containerEl).setName("对 Obsidian 嵌入（![[...]]) 应用").addToggle(t => t.setValue(this.plugin.settings.uniformAffectsWikilink).onChange(async v => { this.plugin.settings.uniformAffectsWikilink = v; await this.plugin.saveSettings(); }));
        new Setting(containerEl).setName("对 Markdown ![]() 应用（把尺寸写到 alt）")
            .addToggle(t => t.setValue(this.plugin.settings.uniformAffectsMarkdownAlt).onChange(async v => { this.plugin.settings.uniformAffectsMarkdownAlt = v; await this.plugin.saveSettings(); }));
        new Setting(containerEl).setName("对 HTML <img> 应用（写 width/height）")
            .setDesc("默认关闭，避免对笔记排版产生影响")
            .addToggle(t => t.setValue(this.plugin.settings.uniformAffectsMarkdown).onChange(async v => { this.plugin.settings.uniformAffectsMarkdown = v; await this.plugin.saveSettings(); }));

        // 操作按钮
        containerEl.createEl("h3", { text: "操作" });

        new Setting(containerEl).setName("添加/更新别名（整篇，离屏）")
            .addButton(btn => btn.setButtonText("运行").onClick(async () => {
                const view = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (!view) { new Notice("请先打开一个 Markdown 笔记"); return; }
                const { changed } = await this.plugin.offscreenModifyWhole(view.file, "add");
                new Notice(changed > 0 ? `已更新 ${changed} 处图片别名` : "未发现需要更新的图片嵌入");
            }));

        new Setting(containerEl).setName("添加/更新别名（选区，离屏）")
            .setDesc("仅对选中范围生成/更新别名；支持多选区")
            .addButton(btn => btn.setButtonText("添加/更新选区").onClick(async () => {
                const view = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (!view) { new Notice("请先打开一个 Markdown 笔记"); return; }
                const { changed } = await this.plugin.offscreenModifySelection(view, "add");
                new Notice(changed > 0 ? `已更新选区内 ${changed} 处图片别名` : "选区内未发现需要更新的图片嵌入");
            }));

        new Setting(containerEl).setName("清除所有别名（整篇，离屏）")
            .addButton(btn => btn.setButtonText("清除整篇").setCta().onClick(async () => {
                const view = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (!view) { new Notice("请先打开一个 Markdown 笔记"); return; }
                const { changed } = await this.plugin.offscreenModifyWhole(view.file, "clear");
                new Notice(changed > 0 ? `已清除 ${changed} 处别名/alt` : "未发现需要清除的别名");
            }));

        new Setting(containerEl).setName("清除选区别名（离屏）")
            .addButton(btn => btn.setButtonText("清除选区").onClick(async () => {
                const view = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (!view) { new Notice("请先打开一个 Markdown 笔记"); return; }
                const { changed } = await this.plugin.offscreenModifySelection(view, "clear");
                new Notice(changed > 0 ? `已清除选区内 ${changed} 处别名/alt` : "选区内未发现需要清除的别名");
            }));

        new Setting(containerEl).setName("统一图片尺寸（整篇，离屏）")
            .addButton(btn => btn.setButtonText("统一整篇尺寸").setCta().onClick(async () => {
                const view = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (!view) { new Notice("请先打开一个 Markdown 笔记"); return; }
                const { changed } = await this.plugin.offscreenUniformSizeWhole(view.file);
                new Notice(changed > 0 ? `已统一 ${changed} 处图片尺寸` : "未发现可统一的图片尺寸");
            }));

        new Setting(containerEl).setName("统一图片尺寸（选区，离屏）")
            .setDesc("仅对选区内的图片统一尺寸；支持多选区")
            .addButton(btn => btn.setButtonText("统一选区尺寸").onClick(async () => {
                const view = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (!view) { new Notice("请先打开一个 Markdown 笔记"); return; }
                const { changed } = await this.plugin.offscreenUniformSizeSelection(view);
                new Notice(changed > 0 ? `已统一选区内 ${changed} 处图片尺寸` : "选区内未发现可统一的图片尺寸");
            }));
    }
}

/** ---------------- Plugin ---------------- */
class ImageAliasManagerPlugin extends Plugin {
    async onload() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

        // 命令：添加/更新别名（整篇/选区）
        this.addCommand({
            id: "alias-images-offscreen-add",
            name: "按层级路径添加/更新图片别名（整篇，离屏）",
            editorCallback: async (_editor, view) => {
                try {
                    if (!view?.file) return;
                    const { changed } = await this.offscreenModifyWhole(view.file, "add");
                    new Notice(changed > 0 ? `已更新 ${changed} 处图片别名` : "未发现需要更新的图片嵌入");
                } catch (e) { console.error(e); new Notice("处理失败，请查看控制台日志"); }
            }
        });
        this.addCommand({
            id: "alias-images-offscreen-add-selection",
            name: "按层级路径添加/更新图片别名（选区，离屏）",
            editorCallback: async (editor, view) => {
                try {
                    if (!view?.file) return;
                    const { changed } = await this.offscreenModifySelection(view, "add");
                    new Notice(changed > 0 ? `已更新选区内 ${changed} 处图片别名` : "选区内未发现需要更新的图片嵌入");
                } catch (e) { console.error(e); new Notice("处理失败，请查看控制台日志"); }
            }
        });

        // 命令：清除别名（整篇/选区）
        this.addCommand({
            id: "alias-images-offscreen-clear",
            name: "清除所有图片别名/alt（整篇，离屏）",
            editorCallback: async (_editor, view) => {
                try {
                    if (!view?.file) return;
                    const { changed } = await this.offscreenModifyWhole(view.file, "clear");
                    new Notice(changed > 0 ? `已清除 ${changed} 处别名/alt` : "未发现需要清除的别名");
                } catch (e) { console.error(e); new Notice("处理失败，请查看控制台日志"); }
            }
        });
        this.addCommand({
            id: "alias-images-offscreen-clear-selection",
            name: "清除选区内的图片别名/alt（离屏）",
            editorCallback: async (editor, view) => {
                try {
                    if (!view?.file) return;
                    const { changed } = await this.offscreenModifySelection(view, "clear");
                    new Notice(changed > 0 ? `已清除选区内 ${changed} 处别名/alt` : "选区内未发现需要清除的别名");
                } catch (e) { console.error(e); new Notice("处理失败，请查看控制台日志"); }
            }
        });

        // 命令：统一尺寸（整篇/选区）
        this.addCommand({
            id: "uniform-size-offscreen-whole",
            name: "统一图片尺寸（整篇，离屏）",
            editorCallback: async (_editor, view) => {
                try {
                    if (!view?.file) return;
                    const { changed } = await this.offscreenUniformSizeWhole(view.file);
                    new Notice(changed > 0 ? `已统一 ${changed} 处图片尺寸` : "未发现可统一的图片尺寸");
                } catch (e) { console.error(e); new Notice("处理失败，请查看控制台日志"); }
            }
        });
        this.addCommand({
            id: "uniform-size-offscreen-selection",
            name: "统一图片尺寸（选区，离屏）",
            editorCallback: async (editor, view) => {
                try {
                    if (!view?.file) return;
                    const { changed } = await this.offscreenUniformSizeSelection(view);
                    new Notice(changed > 0 ? `已统一选区内 ${changed} 处图片尺寸` : "选区内未发现可统一的图片尺寸");
                } catch (e) { console.error(e); new Notice("处理失败，请查看控制台日志"); }
            }
        });

        this.addRibbonIcon("gear", "Image Alias Manager 设置（整合版）", () => this.openSettings());
        this.addSettingTab(new ImageAliasManagerSettingTab(this.app, this));
    }

    async saveSettings() { await this.saveData(this.settings); }
    openSettings() { const s = this.app.setting; if (s) { s.open(); setTimeout(() => { try { s.setActiveTabById(this.manifest.id); } catch (_) { } }, 50); } }

    /** -------- Off-screen ops: whole file / selection -------- */
    async offscreenModifyWhole(file, mode) {
        const { leaves, states } = await this._detachLeavesHolding(file.path);
        const original = await this.app.vault.read(file);
        const result = (mode === "clear")
            ? processText_clearAliases(original, this.settings)
            : processText_addAliases(original, file.basename, this.settings);
        if (result.changed > 0) { await this.app.vault.modify(file, result.text); await sleep(20); }
        await this._restoreLeaves(leaves, states);
        return { changed: result.changed };
    }

    async offscreenModifySelection(view, mode) {
        const editor = view?.editor, file = view?.file;
        if (!editor || !file) return { changed: 0 };
        const ranges = getSelectionOffsets(editor);
        if (ranges.length === 0) { new Notice("请先选择要处理的文本范围"); return { changed: 0 }; }

        const { leaves, states } = await this._detachLeavesHolding(file.path);
        let text = await this.app.vault.read(file);
        let changed = 0;

        const maxLen = text.length;
        const safeRanges = ranges.map(r => ({ from: Math.max(0, Math.min(maxLen, r.from)), to: Math.max(0, Math.min(maxLen, r.to)) }))
            .filter(r => r.to > r.from)
            .sort((a, b) => b.from - a.from);

        for (const r of safeRanges) {
            const win = text.slice(r.from, r.to);
            const res = (mode === "clear")
                ? processText_clearAliases(win, this.settings)
                : processText_addAliases(win, file.basename, this.settings);
            if (res.changed > 0) {
                text = text.slice(0, r.from) + res.text + text.slice(r.to);
                changed += res.changed;
            }
        }

        if (changed > 0) { await this.app.vault.modify(file, text); await sleep(20); }
        await this._restoreLeaves(leaves, states);
        return { changed };
    }

    async offscreenUniformSizeWhole(file) {
        const { leaves, states } = await this._detachLeavesHolding(file.path);
        let text = await this.app.vault.read(file);
        const res = await processText_uniformSize(this.app, text, file.path, this.settings);
        if (res.changed > 0) { await this.app.vault.modify(file, res.text); await sleep(20); }
        await this._restoreLeaves(leaves, states);
        return { changed: res.changed };
    }

    async offscreenUniformSizeSelection(view) {
        const editor = view?.editor, file = view?.file;
        if (!editor || !file) return { changed: 0 };
        const ranges = getSelectionOffsets(editor);
        if (ranges.length === 0) { new Notice("请先选择要处理的文本范围"); return { changed: 0 }; }

        const { leaves, states } = await this._detachLeavesHolding(file.path);
        let text = await this.app.vault.read(file);
        let changed = 0;

        const maxLen = text.length;
        const safeRanges = ranges.map(r => ({ from: Math.max(0, Math.min(maxLen, r.from)), to: Math.max(0, Math.min(maxLen, r.to)) }))
            .filter(r => r.to > r.from)
            .sort((a, b) => b.from - a.from);

        for (const r of safeRanges) {
            const win = text.slice(r.from, r.to);
            const res = await processText_uniformSize(this.app, win, file.path, this.settings);
            if (res.changed > 0) {
                text = text.slice(0, r.from) + res.text + text.slice(r.to);
                changed += res.changed;
            }
        }

        if (changed > 0) { await this.app.vault.modify(file, text); await sleep(20); }
        await this._restoreLeaves(leaves, states);
        return { changed };
    }

    /** -------- Detach/restore leaves holding the file (anti setAttr) -------- */
    async _detachLeavesHolding(filePath) {
        const leaves = this.app.workspace.getLeavesOfType("markdown") || [];
        const holders = []; const states = [];
        for (const leaf of leaves) {
            const v = leaf.view;
            if (v && v.file && v.file.path === filePath) {
                holders.push(leaf); states.push(leaf.getViewState());
            }
        }
        for (const leaf of holders) {
            try {
                await leaf.setViewState({ type: "markdown", state: { file: null, mode: "source", source: true, data: "# …\n" } }, { focus: false });
            } catch { }
        }
        if (holders.length) await sleep(20);
        return { leaves: holders, states };
    }
    async _restoreLeaves(leaves, states) {
        for (let i = 0; i < leaves.length; i++) {
            try { await leaves[i].setViewState(states[i], { focus: false }); } catch (e) { console.warn("restore leaf failed", e); }
        }
    }
}

module.exports = ImageAliasManagerPlugin;
