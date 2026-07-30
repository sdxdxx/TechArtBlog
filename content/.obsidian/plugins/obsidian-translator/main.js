"use strict";

const { Plugin, PluginSettingTab, Setting, Modal, Notice, requestUrl, setIcon, ItemView } = require("obsidian");

const VIEW_TYPE_XD_TRANSLATOR = "xd-translator-view";
const MODE_TRADITIONAL = "traditional";
const MODE_AI = "ai";
const MODE_MIXED = "mixed";
const DEFAULT_AI_PROVIDER = "openai";
const DEFAULT_SOURCE_LANGUAGE = "auto";
const DEFAULT_TARGET_LANGUAGE = "Chinese (Simplified)";

const MODE_OPTIONS = {
  [MODE_TRADITIONAL]: "Traditional",
  [MODE_AI]: "AI",
  [MODE_MIXED]: "Mixed"
};

const LANGUAGE_OPTIONS = {
  auto: "Auto detect",
  "Chinese (Simplified)": "Chinese (Simplified)",
  "Chinese (Traditional)": "Chinese (Traditional)",
  English: "English",
  Japanese: "Japanese",
  Korean: "Korean",
  French: "French",
  Spanish: "Spanish",
  German: "German",
  Russian: "Russian",
  Portuguese: "Portuguese",
  Italian: "Italian",
  Vietnamese: "Vietnamese"
};

const YOUDAO_LANGUAGES = {
  auto: "Auto detect",
  "zh-CHS": "Chinese (Simplified)",
  "zh-CHT": "Chinese (Traditional)",
  en: "English",
  ja: "Japanese",
  ko: "Korean",
  fr: "French",
  es: "Spanish",
  pt: "Portuguese",
  it: "Italian",
  ru: "Russian",
  vi: "Vietnamese",
  de: "German"
};

const MICROSOFT_LANGUAGES = {
  "": "Auto detect",
  "zh-Hans": "Chinese (Simplified)",
  "zh-Hant": "Chinese (Traditional)",
  en: "English",
  ja: "Japanese",
  ko: "Korean",
  fr: "French",
  es: "Spanish",
  pt: "Portuguese",
  it: "Italian",
  ru: "Russian",
  vi: "Vietnamese",
  de: "German"
};

const BAIDU_LANGUAGES = {
  auto: "Auto detect",
  zh: "Chinese (Simplified)",
  cht: "Chinese (Traditional)",
  en: "English",
  jp: "Japanese",
  kor: "Korean",
  fra: "French",
  spa: "Spanish",
  pt: "Portuguese",
  it: "Italian",
  ru: "Russian",
  vie: "Vietnamese",
  de: "German"
};

const TRADITIONAL_PROVIDER_DEFINITIONS = {
  youdao: {
    label: "Youdao",
    defaultConfig: { appId: "", secretKey: "", from: "auto", to: "zh-CHS", audio: false }
  },
  microsoft: {
    label: "Microsoft",
    defaultConfig: { secretKey: "", location: "", from: "", to: "zh-Hans" }
  },
  baidu: {
    label: "Baidu",
    defaultConfig: { appId: "", secretKey: "", from: "auto", to: "zh" }
  }
};

const AI_PROVIDER_DEFINITIONS = {
  openai: {
    label: "OpenAI",
    protocol: "openai",
    defaultBaseUrl: "https://api.openai.com/v1",
    defaultModel: "gpt-5.4-mini"
  },
  anthropic: {
    label: "Anthropic Claude",
    protocol: "anthropic",
    defaultBaseUrl: "https://api.anthropic.com",
    defaultModel: "claude-haiku-4-5-20251001",
    defaultApiVersion: "2023-06-01"
  },
  gemini: {
    label: "Google Gemini",
    protocol: "gemini",
    defaultBaseUrl: "https://generativelanguage.googleapis.com/v1beta",
    defaultModel: "gemini-2.5-flash"
  },
  deepseek: {
    label: "DeepSeek",
    protocol: "openai",
    defaultBaseUrl: "https://api.deepseek.com",
    defaultModel: "deepseek-v4-flash"
  },
  dashscope: {
    label: "Tongyi / DashScope",
    protocol: "openai",
    defaultBaseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    defaultModel: "qwen3.6-plus"
  },
  moonshot: {
    label: "Kimi / Moonshot",
    protocol: "openai",
    defaultBaseUrl: "https://api.moonshot.ai/v1",
    defaultModel: "kimi-k2.6"
  },
  zhipu: {
    label: "Zhipu GLM",
    protocol: "openai",
    defaultBaseUrl: "https://open.bigmodel.cn/api/paas/v4",
    defaultModel: "glm-5.1"
  },
  doubao: {
    label: "Doubao / Volcengine Ark",
    protocol: "openai",
    defaultBaseUrl: "https://ark.cn-beijing.volces.com/api/v3",
    defaultModel: "doubao-seed-1-6-251015"
  },
  compatible: {
    label: "Custom OpenAI-compatible",
    protocol: "openai",
    defaultBaseUrl: "",
    defaultModel: ""
  }
};

const DEFAULT_AI_PROVIDER_SETTINGS = Object.fromEntries(
  Object.entries(AI_PROVIDER_DEFINITIONS).map(([key, definition]) => [key, {
    apiKey: "",
    baseUrl: definition.defaultBaseUrl,
    model: definition.defaultModel,
    apiVersion: definition.defaultApiVersion || ""
  }])
);

const DEFAULT_PROVIDERS = {
  youdao: TRADITIONAL_PROVIDER_DEFINITIONS.youdao.defaultConfig,
  microsoft: TRADITIONAL_PROVIDER_DEFINITIONS.microsoft.defaultConfig,
  baidu: TRADITIONAL_PROVIDER_DEFINITIONS.baidu.defaultConfig,
  ...DEFAULT_AI_PROVIDER_SETTINGS
};

const DEFAULT_SETTINGS = {
  version: 2,
  mode: MODE_TRADITIONAL,
  traditionalProviders: ["youdao"],
  aiProvider: DEFAULT_AI_PROVIDER,
  aiSourceLanguage: DEFAULT_SOURCE_LANGUAGE,
  aiTargetLanguage: DEFAULT_TARGET_LANGUAGE,
  aiTemperature: 0.2,
  aiMaxTokens: 4096,
  viewMode: MODE_TRADITIONAL,
  viewTraditionalProvider: "youdao",
  viewAiProvider: DEFAULT_AI_PROVIDER,
  viewAutoTranslate: false,
  viewProviderLanguages: {},
  providers: DEFAULT_PROVIDERS,
  legacyBackup: null
};

function notice(message) {
  new Notice(message);
}

function cleanText(value) {
  return String(value ?? "").replace(/\u00a0/g, " ").trim();
}

function deepMergeDefaults(defaults, value) {
  if (Array.isArray(defaults)) {
    return Array.isArray(value) ? value : [...defaults];
  }
  if (!defaults || typeof defaults !== "object") {
    return value === undefined ? defaults : value;
  }
  const input = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const result = {};
  for (const key of Object.keys(defaults)) {
    result[key] = deepMergeDefaults(defaults[key], input[key]);
  }
  for (const key of Object.keys(input)) {
    if (!(key in result)) {
      result[key] = input[key];
    }
  }
  return result;
}

function normalizeNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function trimTrailingSlash(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function chatCompletionUrl(baseUrl) {
  const clean = trimTrailingSlash(baseUrl);
  if (!clean) return "";
  return clean.endsWith("/chat/completions") ? clean : `${clean}/chat/completions`;
}

function openExternalUrl(url) {
  if (!url) {
    notice("No details link available.");
    return;
  }
  if (typeof window !== "undefined" && typeof window.open === "function") {
    window.open(url, "_blank", "noopener");
  } else {
    notice(url);
  }
}

function detectYoudaoDetailLanguage(text, from) {
  if (from && from !== "auto") return from;
  return /[\u3400-\u9fff]/.test(text) ? "zh-CHS" : "en";
}

function providerDetailsUrl(service, text, settings, customTargets) {
  const query = cleanText(text);
  if (!query) return "";
  const encoded = encodeURIComponent(query);
  if (service === "youdao") {
    const config = getTraditionalProviderConfig(settings, "youdao");
    const lang = encodeURIComponent(detectYoudaoDetailLanguage(query, config.from));
    return `https://dict.youdao.com/result?word=${encoded}&lang=${lang}`;
  }
  if (service === "microsoft") {
    const target = encodeURIComponent(customTargets.microsoft || "zh-Hans");
    return `https://www.bing.com/translator?text=${encoded}&from=auto&to=${target}`;
  }
  if (service === "baidu") {
    const target = encodeURIComponent(customTargets.baidu || "zh");
    return `https://fanyi.baidu.com/#auto/${target}/${encoded}`;
  }
  return "";
}

function sanitizeError(error) {
  const message = String(error?.message || error || "Request failed.");
  return message
    .replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/gi, "Bearer [redacted]")
    .replace(/sk-[A-Za-z0-9._-]+/g, "sk-[redacted]")
    .replace(/([?&](?:key|api_key)=)[^&\s]+/gi, "$1[redacted]")
    .replace(/((?:x-api-key|api-key)["']?\s*[:=]\s*["']?)[^"',\s}]+/gi, "$1[redacted]")
    .slice(0, 500);
}

async function parseJsonResponse(response) {
  if (response?.json !== undefined) return response.json;
  const text = response?.text || "";
  return text ? JSON.parse(text) : {};
}

async function requestJson(options) {
  const response = await requestUrl({
    method: options.method || "GET",
    url: options.url,
    headers: options.headers || {},
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    throw: false
  });
  if (response.status < 200 || response.status >= 300) {
    let detail = "";
    try {
      const json = await parseJsonResponse(response);
      detail = json?.error?.message || json?.message || JSON.stringify(json);
    } catch {
      detail = response.text || "";
    }
    throw new Error(`HTTP ${response.status}${detail ? `: ${detail}` : ""}`);
  }
  return parseJsonResponse(response);
}

function createHashHex(algorithm, text) {
  const cryptoModule = require("crypto");
  return cryptoModule.createHash(algorithm).update(String(text), "utf8").digest("hex");
}

function truncateYoudaoText(value) {
  const text = String(value);
  const length = text.length;
  return length <= 20 ? text : `${text.substring(0, 10)}${length}${text.substring(length - 10)}`;
}

function selectedTraditionalProviders(settings) {
  return (settings.traditionalProviders || []).filter((key) => key in TRADITIONAL_PROVIDER_DEFINITIONS);
}

function selectedViewTraditionalProvider(settings) {
  if (settings.viewTraditionalProvider in TRADITIONAL_PROVIDER_DEFINITIONS) return settings.viewTraditionalProvider;
  const selected = selectedTraditionalProviders(settings);
  return selected[0] || "youdao";
}

function selectedViewAiProvider(settings) {
  if (settings.viewAiProvider in AI_PROVIDER_DEFINITIONS) return settings.viewAiProvider;
  if (settings.aiProvider in AI_PROVIDER_DEFINITIONS) return settings.aiProvider;
  return DEFAULT_AI_PROVIDER;
}

function usesTraditional(settings) {
  return settings.mode === MODE_TRADITIONAL || settings.mode === MODE_MIXED;
}

function usesAi(settings) {
  return settings.mode === MODE_AI || settings.mode === MODE_MIXED;
}

function servicesForSettings(settings) {
  const traditional = usesTraditional(settings) ? selectedTraditionalProviders(settings) : [];
  if (settings.mode === MODE_AI) return ["ai"];
  if (settings.mode === MODE_MIXED) return ["ai", ...traditional];
  return traditional;
}

function getAiProviderSettings(settings) {
  const provider = settings.aiProvider && AI_PROVIDER_DEFINITIONS[settings.aiProvider] ? settings.aiProvider : DEFAULT_AI_PROVIDER;
  const definition = AI_PROVIDER_DEFINITIONS[provider];
  const config = deepMergeDefaults(DEFAULT_AI_PROVIDER_SETTINGS[provider], settings.providers?.[provider] || {});
  return { provider, definition, config };
}

function getTraditionalProviderConfig(settings, provider) {
  const definition = TRADITIONAL_PROVIDER_DEFINITIONS[provider];
  return deepMergeDefaults(definition.defaultConfig, settings.providers?.[provider] || {});
}

function languageOptionsForService(service) {
  if (service === "youdao") return YOUDAO_LANGUAGES;
  if (service === "microsoft") return MICROSOFT_LANGUAGES;
  if (service === "baidu") return BAIDU_LANGUAGES;
  return LANGUAGE_OPTIONS;
}

function defaultSourceForService(service, settings) {
  if (service === "youdao") return getTraditionalProviderConfig(settings, "youdao").from || "auto";
  if (service === "microsoft") return getTraditionalProviderConfig(settings, "microsoft").from || "";
  if (service === "baidu") return getTraditionalProviderConfig(settings, "baidu").from || "auto";
  return settings.aiSourceLanguage || DEFAULT_SOURCE_LANGUAGE;
}

function defaultTargetForService(service, settings) {
  if (service === "youdao") return getTraditionalProviderConfig(settings, "youdao").to || "zh-CHS";
  if (service === "microsoft") return getTraditionalProviderConfig(settings, "microsoft").to || "zh-Hans";
  if (service === "baidu") return getTraditionalProviderConfig(settings, "baidu").to || "zh";
  return settings.aiTargetLanguage || DEFAULT_TARGET_LANGUAGE;
}

function viewLanguageKey(mode, provider) {
  return mode === MODE_AI ? "ai" : provider;
}

function getViewLanguage(settings, mode, provider, direction) {
  const service = mode === MODE_AI ? "ai" : provider;
  const options = languageOptionsForService(service);
  const key = viewLanguageKey(mode, provider);
  const stored = settings.viewProviderLanguages?.[key]?.[direction];
  if (stored !== undefined && stored in options) return stored;
  const fallback = direction === "from" ? defaultSourceForService(service, settings) : defaultTargetForService(service, settings);
  return fallback in options ? fallback : Object.keys(options)[0] || "";
}

function setViewLanguage(settings, mode, provider, direction, value) {
  const key = viewLanguageKey(mode, provider);
  settings.viewProviderLanguages ||= {};
  settings.viewProviderLanguages[key] ||= {};
  settings.viewProviderLanguages[key][direction] = value;
}

function settingsWithServiceLanguages(settings, service, provider, from, to) {
  const next = deepMergeDefaults(DEFAULT_SETTINGS, settings);
  if (service === "ai") {
    next.aiProvider = provider;
    next.aiSourceLanguage = from || DEFAULT_SOURCE_LANGUAGE;
    next.aiTargetLanguage = to || DEFAULT_TARGET_LANGUAGE;
    return next;
  }
  next.providers ||= {};
  next.providers[service] = {
    ...getTraditionalProviderConfig(next, service),
    from,
    to
  };
  return next;
}

function legacyToProviders(data) {
  const providers = {};
  if ("appId" in data || "secretKey" in data || "yFrom" in data || "yTo" in data || "audio" in data) {
    providers.youdao = {
      appId: data.appId || "",
      secretKey: data.secretKey || "",
      from: data.yFrom || "auto",
      to: data.yTo || "zh-CHS",
      audio: !!data.audio
    };
  }
  if ("microsoftSecretKey" in data || "microsoftLocation" in data || "mFrom" in data || "mTo" in data) {
    providers.microsoft = {
      secretKey: data.microsoftSecretKey || "",
      location: data.microsoftLocation || "",
      from: data.mFrom || "",
      to: data.mTo || "zh-Hans"
    };
  }
  if ("baiduAppId" in data || "baiduSecretKey" in data || "bFrom" in data || "bTo" in data) {
    providers.baidu = {
      appId: data.baiduAppId || "",
      secretKey: data.baiduSecretKey || "",
      from: data.bFrom || "auto",
      to: data.bTo || "zh"
    };
  }
  if (data.aiProviders && typeof data.aiProviders === "object") {
    Object.assign(providers, data.aiProviders);
  }
  return providers;
}

function migrateSettings(data) {
  if (data?.providers) {
    return deepMergeDefaults(DEFAULT_SETTINGS, data);
  }
  const traditionalProviders = [];
  if (data?.youdaoEnable || data?.appId || data?.secretKey) traditionalProviders.push("youdao");
  if (data?.microsoftEnable) traditionalProviders.push("microsoft");
  if (data?.baiduEnable) traditionalProviders.push("baidu");
  const hasTraditional = traditionalProviders.length > 0;
  const hasAi = !!data?.aiEnable;
  const mode = hasAi && hasTraditional ? MODE_MIXED : hasAi ? MODE_AI : MODE_TRADITIONAL;
  return deepMergeDefaults(DEFAULT_SETTINGS, {
    version: 2,
    mode,
    traditionalProviders: hasTraditional ? traditionalProviders : ["youdao"],
    aiProvider: data?.aiProvider || DEFAULT_AI_PROVIDER,
    aiSourceLanguage: data?.aiSourceLanguage || DEFAULT_SOURCE_LANGUAGE,
    aiTargetLanguage: data?.aiTargetLanguage || DEFAULT_TARGET_LANGUAGE,
    aiTemperature: data?.aiTemperature ?? DEFAULT_SETTINGS.aiTemperature,
    aiMaxTokens: data?.aiMaxTokens ?? DEFAULT_SETTINGS.aiMaxTokens,
    providers: legacyToProviders(data || {}),
    legacyBackup: data ? { migratedFrom: "legacy-top-level-fields" } : null
  });
}

function normalizeSettings(settings) {
  if (!(settings.mode in MODE_OPTIONS)) settings.mode = MODE_TRADITIONAL;
  settings.traditionalProviders = selectedTraditionalProviders(settings);
  if (!AI_PROVIDER_DEFINITIONS[settings.aiProvider]) settings.aiProvider = DEFAULT_AI_PROVIDER;
  settings.aiSourceLanguage ||= DEFAULT_SOURCE_LANGUAGE;
  settings.aiTargetLanguage ||= DEFAULT_TARGET_LANGUAGE;
  settings.aiTemperature = normalizeNumber(settings.aiTemperature, DEFAULT_SETTINGS.aiTemperature, 0, 2);
  settings.aiMaxTokens = Math.round(normalizeNumber(settings.aiMaxTokens, DEFAULT_SETTINGS.aiMaxTokens, 1, 128000));
  if (![MODE_TRADITIONAL, MODE_AI].includes(settings.viewMode)) settings.viewMode = MODE_TRADITIONAL;
  settings.viewTraditionalProvider = selectedViewTraditionalProvider(settings);
  settings.viewAiProvider = selectedViewAiProvider(settings);
  settings.viewAutoTranslate = !!settings.viewAutoTranslate;
  if (!settings.viewProviderLanguages || typeof settings.viewProviderLanguages !== "object" || Array.isArray(settings.viewProviderLanguages)) {
    settings.viewProviderLanguages = {};
  }
  settings.providers = deepMergeDefaults(DEFAULT_PROVIDERS, settings.providers || {});
  settings.version = 2;
}

async function translateYoudao(text, settings, targetOverride) {
  const config = getTraditionalProviderConfig(settings, "youdao");
  const appId = cleanText(config.appId);
  const secretKey = cleanText(config.secretKey);
  if (!appId) throw new Error("Youdao AppId is required.");
  if (!secretKey) throw new Error("Youdao SecretKey is required.");
  const salt = Date.now();
  const curtime = Math.round(Date.now() / 1000);
  const sign = createHashHex("sha256", `${appId}${truncateYoudaoText(text)}${salt}${curtime}${secretKey}`);
  const params = new URLSearchParams({
    q: text,
    appKey: appId,
    salt: String(salt),
    from: config.from || "auto",
    to: targetOverride || config.to || "zh-CHS",
    sign,
    curtime: String(curtime),
    signType: "v3"
  });
  const data = await requestJson({ url: `https://openapi.youdao.com/api?${params.toString()}` });
  if (data.errorCode && data.errorCode !== "0") throw new Error(`Youdao error ${data.errorCode}`);
  return formatYoudaoResult(data);
}

function formatYoudaoResult(data) {
  const sections = [];
  const translations = Array.isArray(data.translation) ? data.translation.filter(Boolean) : [];
  if (translations.length) sections.push(translations.join("\n"));
  const basic = [];
  if (data.basic?.phonetic) basic.push(`[${data.basic.phonetic}]`);
  if (Array.isArray(data.basic?.explains)) basic.push(...data.basic.explains);
  if (basic.length) sections.push(basic.join("\n"));
  if (Array.isArray(data.web)) {
    const webLines = data.web
      .filter((item) => Array.isArray(item.value) && item.value.length)
      .map((item) => `${item.key}: ${item.value.join(", ")}`);
    if (webLines.length) {
      sections.push(["More meanings:", ...webLines].join("\n"));
    }
  }
  return sections.filter(Boolean).join("\n\n");
}

async function translateMicrosoft(text, settings, targetOverride) {
  const config = getTraditionalProviderConfig(settings, "microsoft");
  const secretKey = cleanText(config.secretKey);
  const location = cleanText(config.location);
  if (!secretKey) throw new Error("Microsoft SecretKey is required.");
  if (!location) throw new Error("Microsoft Location is required.");
  const to = targetOverride || config.to || "zh-Hans";
  const from = config.from ? `&from=${encodeURIComponent(config.from)}` : "";
  const url = `https://api-apc.cognitive.microsofttranslator.com/translate?api-version=3.0${from}&to=${encodeURIComponent(to)}&includeAlignment=true&textType=html`;
  const data = await requestJson({
    method: "POST",
    url,
    headers: {
      "Ocp-Apim-Subscription-Key": secretKey,
      "Ocp-Apim-Subscription-Region": location,
      "Content-Type": "application/json"
    },
    body: [{ text }]
  });
  return (data || []).flatMap((item) => item.translations || []).map((item) => item.text).join("\n");
}

async function translateBaidu(text, settings, targetOverride) {
  const config = getTraditionalProviderConfig(settings, "baidu");
  const appId = cleanText(config.appId);
  const secretKey = cleanText(config.secretKey);
  if (!appId) throw new Error("Baidu AppId is required.");
  if (!secretKey) throw new Error("Baidu SecretKey is required.");
  const salt = Date.now();
  const sign = createHashHex("md5", `${appId}${text}${salt}${secretKey}`);
  const params = new URLSearchParams({
    q: text,
    from: config.from || "auto",
    to: targetOverride || config.to || "zh",
    appid: appId,
    salt: String(salt),
    sign
  });
  const data = await requestJson({ url: `https://api.fanyi.baidu.com/api/trans/vip/translate?${params.toString()}` });
  if (data.error_code) throw new Error(`Baidu error ${data.error_code}`);
  return (data.trans_result || []).map((item) => item.dst).join("\n");
}

function buildAiMessages(text, settings) {
  const source = settings.aiSourceLanguage || DEFAULT_SOURCE_LANGUAGE;
  const target = settings.aiTargetLanguage || DEFAULT_TARGET_LANGUAGE;
  const system = [
    "You are a professional translation engine.",
    "Translate faithfully and output only the translated text.",
    "Preserve Markdown structure, code blocks, inline code, links, tables, lists, punctuation style, filenames, API names, and technical terms unless translation is clearly appropriate.",
    "Do not add explanations, notes, quotes, headings, or commentary."
  ].join(" ");
  const user = [`Source language: ${source}`, `Target language: ${target}`, "", "Text to translate:", text].join("\n");
  return { system, user };
}

function buildAiDetailMessages(text, translation, settings) {
  const source = settings.aiSourceLanguage || DEFAULT_SOURCE_LANGUAGE;
  const target = settings.aiTargetLanguage || DEFAULT_TARGET_LANGUAGE;
  const system = [
    "You are a careful translation explainer.",
    "Explain the source text, the translation, important meanings, nuance, usage, and useful alternatives.",
    "For single words or short phrases, include common senses and example usage when helpful.",
    "Write the explanation in the target language unless another language is clearly more useful.",
    "Do not mention API details or implementation details."
  ].join(" ");
  const user = [
    `Source language: ${source}`,
    `Target language: ${target}`,
    "",
    "Source text:",
    text,
    "",
    "Current translation:",
    translation || "(none)"
  ].join("\n");
  return { system, user };
}

function validateAiProvider(definition, config) {
  if (!cleanText(config.apiKey)) throw new Error(`${definition.label} API key is required.`);
  if (!cleanText(config.model)) throw new Error(`${definition.label} model is required.`);
  if (!cleanText(config.baseUrl)) throw new Error(`${definition.label} base URL is required.`);
}

async function translateAi(text, settings) {
  return requestAiWithMessages(buildAiMessages(text, settings), settings);
}

async function translateAiDetails(text, translation, settings) {
  return requestAiWithMessages(buildAiDetailMessages(text, translation, settings), settings);
}

async function requestAiWithMessages(messages, settings) {
  const { definition, config } = getAiProviderSettings(settings);
  validateAiProvider(definition, config);
  const { system, user } = messages;
  const temperature = normalizeNumber(settings.aiTemperature, 0.2, 0, 2);
  const maxTokens = Math.round(normalizeNumber(settings.aiMaxTokens, DEFAULT_SETTINGS.aiMaxTokens, 1, 128000));
  if (definition.protocol === "anthropic") {
    return translateAnthropic({ definition, config, system, user, temperature, maxTokens });
  }
  if (definition.protocol === "gemini") {
    return translateGemini({ definition, config, system, user, temperature, maxTokens });
  }
  return translateOpenAiCompatible({ definition, config, system, user, temperature, maxTokens });
}

async function translateOpenAiCompatible({ definition, config, system, user, temperature, maxTokens }) {
  const data = await requestJson({
    method: "POST",
    url: chatCompletionUrl(config.baseUrl),
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: {
      model: config.model,
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
      temperature,
      max_tokens: maxTokens,
      stream: false
    }
  });
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error(`${definition.label} returned an empty response.`);
  return String(content).trim();
}

async function translateAnthropic({ definition, config, system, user, temperature, maxTokens }) {
  const data = await requestJson({
    method: "POST",
    url: `${trimTrailingSlash(config.baseUrl)}/v1/messages`,
    headers: {
      "x-api-key": config.apiKey,
      "anthropic-version": config.apiVersion || AI_PROVIDER_DEFINITIONS.anthropic.defaultApiVersion,
      "Content-Type": "application/json"
    },
    body: {
      model: config.model,
      system,
      messages: [{ role: "user", content: user }],
      temperature,
      max_tokens: maxTokens
    }
  });
  const content = (data?.content || []).filter((part) => part.type === "text").map((part) => part.text).join("\n");
  if (!content) throw new Error(`${definition.label} returned an empty response.`);
  return content.trim();
}

async function translateGemini({ definition, config, system, user, temperature, maxTokens }) {
  const model = encodeURIComponent(config.model);
  const url = `${trimTrailingSlash(config.baseUrl)}/models/${model}:generateContent?key=${encodeURIComponent(config.apiKey)}`;
  const data = await requestJson({
    method: "POST",
    url,
    headers: { "Content-Type": "application/json" },
    body: {
      contents: [{ role: "user", parts: [{ text: `${system}\n\n${user}` }] }],
      generationConfig: { temperature, maxOutputTokens: maxTokens }
    }
  });
  const content = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n");
  if (!content) throw new Error(`${definition.label} returned an empty response.`);
  return content.trim();
}

function createResultBlock(container, title) {
  const details = container.createEl("details", { cls: "translator-result" });
  details.open = true;
  const summary = details.createEl("summary", { cls: "translator-result-header" });
  summary.createSpan({ cls: "translator-result-title", text: title });
  const actions = summary.createDiv({ cls: "translator-result-actions" });
  actions.addEventListener("click", (event) => event.stopPropagation());
  const content = details.createDiv({ cls: "translator-result-content" });
  return { details, summary, actions, content };
}

function createSourceBlock(container, text) {
  const block = container.createDiv({ cls: "translator-source-block" });
  const header = block.createDiv({ cls: "translator-source-header" });
  header.createSpan({ cls: "translator-source-title", text: "Original" });
  const body = block.createEl("pre", { cls: "translator-source-text" });
  body.textContent = text;
  return block;
}

function addInlineSelect(container, options, value, onChange) {
  const select = container.createEl("select", { cls: "translator-inline-select" });
  for (const [optionValue, label] of Object.entries(options)) {
    const option = select.createEl("option", { text: label });
    option.value = optionValue;
  }
  select.value = value || "";
  select.onchange = () => onChange(select.value);
  select.onclick = (event) => event.stopPropagation();
  return select;
}

function setLoading(container, text = "Translating...") {
  container.empty();
  container.createDiv({ cls: "translator-state translator-state-loading", text });
}

function setError(container, error) {
  container.empty();
  container.createDiv({ cls: "translator-state translator-state-error", text: sanitizeError(error) });
}

function setTextResult(container, text) {
  container.empty();
  const result = container.createEl("pre", { cls: "translator-result-text" });
  result.textContent = text || "No results.";
}

function addFloatingCopyButton(container, getText) {
  const button = container.createEl("button", { cls: "translator-floating-copy" });
  button.type = "button";
  button.title = "Copy";
  button.setAttribute("aria-label", "Copy translation");
  setIcon(button, "copy");
  button.onclick = (event) => {
    event.stopPropagation();
    copyText(getText());
  };
  return button;
}

function copyText(text) {
  const value = String(text || "");
  if (!value) {
    notice("No translation result to copy.");
    return;
  }
  navigator.clipboard?.writeText(value).then(() => notice("Translation copied.")).catch(() => notice("Copy failed."));
}

function setSelectOptions(select, options, value) {
  select.empty();
  for (const [optionValue, label] of Object.entries(options)) {
    const option = select.createEl("option", { text: label });
    option.value = optionValue;
  }
  select.value = value in options ? value : Object.keys(options)[0] || "";
}

const VIEW_MODE_OPTIONS = {
  [MODE_TRADITIONAL]: "Traditional",
  [MODE_AI]: "AI"
};

class TranslatorSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    const settings = this.plugin.settings;
    containerEl.empty();
    containerEl.addClass("translator-settings");
    containerEl.createDiv({ cls: "translator-settings-title", text: "Translator Settings" });
    const panel = containerEl.createDiv({ cls: "translator-settings-panel" });
    this.addSelectSetting(panel, "Mode", "Choose which provider set runs.", "mode", MODE_OPTIONS, MODE_TRADITIONAL, true);
    if (usesTraditional(settings)) this.renderTraditional(panel);
    if (usesAi(settings)) this.renderAi(panel);
  }

  renderTraditional(container) {
    const selected = new Set(selectedTraditionalProviders(this.plugin.settings));
    this.addSectionLabel(container, "Traditional providers");
    const chips = container.createDiv({ cls: "translator-chip-row" });
    for (const [key, definition] of Object.entries(TRADITIONAL_PROVIDER_DEFINITIONS)) {
      const label = chips.createEl("label", { cls: `translator-chip${selected.has(key) ? " is-active" : ""}` });
      const checkbox = label.createEl("input", { type: "checkbox" });
      checkbox.checked = selected.has(key);
      label.createSpan({ text: definition.label });
      checkbox.onchange = async () => {
        const next = new Set(selectedTraditionalProviders(this.plugin.settings));
        if (checkbox.checked) next.add(key);
        else next.delete(key);
        this.plugin.settings.traditionalProviders = Array.from(next);
        await this.saveAndRefresh();
      };
    }
    const active = selectedTraditionalProviders(this.plugin.settings);
    if (!active.length) {
      container.createDiv({ cls: "translator-setting-note", text: "No traditional provider selected." });
      return;
    }
    for (const provider of active) {
      this.renderTraditionalProvider(container, provider);
    }
  }

  renderTraditionalProvider(container, provider) {
    const definition = TRADITIONAL_PROVIDER_DEFINITIONS[provider];
    this.addSectionLabel(container, `${definition.label} configuration`);
    if (provider === "youdao") {
      this.addText(container, "AppId", "App id.", `providers.youdao.appId`);
      this.addPassword(container, "SecretKey", "Secret key.", `providers.youdao.secretKey`);
      this.addSelectSetting(container, "From", "Source language.", `providers.youdao.from`, YOUDAO_LANGUAGES, "auto");
      this.addSelectSetting(container, "To", "Target language.", `providers.youdao.to`, YOUDAO_LANGUAGES, "zh-CHS");
      this.addToggle(container, "Audio", "Show audio controls when available.", `providers.youdao.audio`);
    } else if (provider === "microsoft") {
      this.addPassword(container, "SecretKey", "Secret key.", `providers.microsoft.secretKey`);
      this.addText(container, "Location", "Azure region.", `providers.microsoft.location`);
      this.addSelectSetting(container, "From", "Source language.", `providers.microsoft.from`, MICROSOFT_LANGUAGES, "");
      this.addSelectSetting(container, "To", "Target language.", `providers.microsoft.to`, MICROSOFT_LANGUAGES, "zh-Hans");
    } else if (provider === "baidu") {
      this.addText(container, "AppId", "App id.", `providers.baidu.appId`);
      this.addPassword(container, "SecretKey", "Secret key.", `providers.baidu.secretKey`);
      this.addSelectSetting(container, "From", "Source language.", `providers.baidu.from`, BAIDU_LANGUAGES, "auto");
      this.addSelectSetting(container, "To", "Target language.", `providers.baidu.to`, BAIDU_LANGUAGES, "zh");
    }
    this.addTestConnectionButton(container, `${definition.label} connection`, "Send a small test request with this provider.", definition.label, () => this.testTraditionalProvider(provider));
  }

  renderAi(container) {
    this.addSectionLabel(container, "AI provider");
    this.addSelectSetting(container, "Provider", "Choose one AI provider.", "aiProvider", Object.fromEntries(Object.entries(AI_PROVIDER_DEFINITIONS).map(([key, provider]) => [key, provider.label])), DEFAULT_AI_PROVIDER, true);
    this.addSelectSetting(container, "Source language", "Source language hint.", "aiSourceLanguage", LANGUAGE_OPTIONS, DEFAULT_SOURCE_LANGUAGE);
    this.addSelectSetting(container, "Target language", "Target language.", "aiTargetLanguage", LANGUAGE_OPTIONS, DEFAULT_TARGET_LANGUAGE);
    this.addSlider(container, "Temperature", "Lower values keep translation faithful.", "aiTemperature", 0, 2, 0.1);
    this.addNumber(container, "Max tokens", "Maximum output tokens.", "aiMaxTokens", 1, 128000);

    const { provider, definition } = getAiProviderSettings(this.plugin.settings);
    this.addSectionLabel(container, `${definition.label} configuration`);
    this.addPassword(container, "API key", "Stored locally in data.json.", `providers.${provider}.apiKey`);
    this.addText(container, "Model", "Model name.", `providers.${provider}.model`);
    this.addText(container, "Base URL", "Provider base URL.", `providers.${provider}.baseUrl`);
    if (definition.protocol === "anthropic") {
      this.addText(container, "API version", "Anthropic version header.", `providers.${provider}.apiVersion`);
    }
    if (provider === "compatible") {
      container.createDiv({ cls: "translator-setting-note", text: "Custom providers must support POST /chat/completions." });
    }
    this.addTestConnectionButton(container, `${definition.label} connection`, "Send a small AI test request with this provider.", definition.label, () => this.testAiProvider());
  }

  addSectionLabel(container, text) {
    container.createDiv({ cls: "translator-section-label", text });
  }

  getNestedValue(path) {
    return path.split(".").reduce((value, key) => value?.[key], this.plugin.settings);
  }

  setNestedValue(path, value) {
    const parts = path.split(".");
    let target = this.plugin.settings;
    for (const part of parts.slice(0, -1)) {
      target[part] ||= {};
      target = target[part];
    }
    target[parts[parts.length - 1]] = value;
  }

  async save(refresh = false) {
    this.plugin.normalizeSettings();
    await this.plugin.saveSettings();
    if (refresh) this.display();
  }

  async saveAndRefresh() {
    await this.save(true);
  }

  addTestConnectionButton(container, name, desc, label, onTest) {
    new Setting(container).setName(name).setDesc(desc).addButton((button) => {
      button.setButtonText("Test connection").onClick(async () => {
        button.setDisabled(true).setButtonText("Testing...");
        try {
          await this.save(false);
          await onTest();
          notice(`${label} connection OK.`);
        } catch (error) {
          notice(`${label} test failed: ${sanitizeError(error)}`);
        } finally {
          button.setDisabled(false).setButtonText("Test connection");
        }
      });
    });
  }

  async testTraditionalProvider(provider) {
    const settings = this.plugin.settings;
    if (provider === "youdao") {
      await translateYoudao("hello", settings, getTraditionalProviderConfig(settings, "youdao").to || "zh-CHS");
      return;
    }
    if (provider === "microsoft") {
      await translateMicrosoft("hello", settings, getTraditionalProviderConfig(settings, "microsoft").to || "zh-Hans");
      return;
    }
    if (provider === "baidu") {
      await translateBaidu("hello", settings, getTraditionalProviderConfig(settings, "baidu").to || "zh");
    }
  }

  async testAiProvider() {
    await translateAi("hello", {
      ...this.plugin.settings,
      aiTemperature: 0,
      aiMaxTokens: 64
    });
  }

  addToggle(container, name, desc, path) {
    new Setting(container).setName(name).setDesc(desc).addToggle((toggle) => {
      toggle.setValue(!!this.getNestedValue(path)).onChange(async (value) => {
        this.setNestedValue(path, value);
        await this.save(false);
      });
    });
  }

  addText(container, name, desc, path) {
    new Setting(container).setName(name).setDesc(desc).addText((text) => {
      text.setValue(String(this.getNestedValue(path) ?? "")).onChange(async (value) => {
        this.setNestedValue(path, value.trim());
        await this.save(false);
      });
    });
  }

  addPassword(container, name, desc, path) {
    new Setting(container).setName(name).setDesc(desc).addText((text) => {
      text.inputEl.type = "password";
      text.setValue(String(this.getNestedValue(path) ?? "")).onChange(async (value) => {
        this.setNestedValue(path, value.trim());
        await this.save(false);
      });
    });
  }

  addNumber(container, name, desc, path, min, max) {
    new Setting(container).setName(name).setDesc(desc).addText((text) => {
      text.inputEl.type = "number";
      text.inputEl.min = String(min);
      text.inputEl.max = String(max);
      text.setValue(String(this.getNestedValue(path) ?? "")).onChange(async (value) => {
        this.setNestedValue(path, Number.parseInt(value, 10));
        await this.save(false);
      });
    });
  }

  addSelectSetting(container, name, desc, path, options, fallback, refresh = false) {
    new Setting(container).setName(name).setDesc(desc).addDropdown((dropdown) => {
      dropdown.addOptions(options).setValue(this.getNestedValue(path) || fallback).onChange(async (value) => {
        this.setNestedValue(path, value);
        await this.save(refresh);
      });
    });
  }

  addSlider(container, name, desc, path, min, max, step) {
    new Setting(container).setName(name).setDesc(desc).addSlider((slider) => {
      slider.setLimits(min, max, step).setValue(Number(this.getNestedValue(path))).setDynamicTooltip().onChange(async (value) => {
        this.setNestedValue(path, value);
        await this.save(false);
      });
    });
  }
}

class TranslatorView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.inputText = "";
    this.outputText = "";
    this.mode = plugin.settings.viewMode || MODE_TRADITIONAL;
    this.provider = this.providerForMode(this.mode);
    this.from = getViewLanguage(plugin.settings, this.mode, this.provider, "from");
    this.to = getViewLanguage(plugin.settings, this.mode, this.provider, "to");
    this.translationSeq = 0;
  }

  getViewType() {
    return VIEW_TYPE_XD_TRANSLATOR;
  }

  getDisplayText() {
    return "XD Translator";
  }

  getIcon() {
    return "languages";
  }

  async onOpen() {
    this.render();
  }

  async onClose() {
    this.contentRoot().empty();
  }

  setInput(text, run = true) {
    this.inputText = String(text || "");
    if (this.inputEl) this.inputEl.value = this.inputText;
    if (run && cleanText(this.inputText)) this.runTranslation();
  }

  providerForMode(mode) {
    return mode === MODE_AI ? selectedViewAiProvider(this.plugin.settings) : selectedViewTraditionalProvider(this.plugin.settings);
  }

  service() {
    return this.mode === MODE_AI ? "ai" : this.provider;
  }

  languageOptions() {
    return languageOptionsForService(this.service());
  }

  syncLanguagesFromSettings() {
    this.from = getViewLanguage(this.plugin.settings, this.mode, this.provider, "from");
    this.to = getViewLanguage(this.plugin.settings, this.mode, this.provider, "to");
  }

  async saveViewState() {
    this.plugin.settings.viewMode = this.mode;
    if (this.mode === MODE_AI) this.plugin.settings.viewAiProvider = this.provider;
    else this.plugin.settings.viewTraditionalProvider = this.provider;
    setViewLanguage(this.plugin.settings, this.mode, this.provider, "from", this.from);
    setViewLanguage(this.plugin.settings, this.mode, this.provider, "to", this.to);
    this.plugin.normalizeSettings();
    await this.plugin.saveSettings();
  }

  contentRoot() {
    return this.containerEl.querySelector(".view-content") || this.containerEl;
  }

  render() {
    const root = this.contentRoot();
    root.empty();
    root.addClass("xd-translator-view");

    const toolbar = root.createDiv({ cls: "xd-translator-view-toolbar" });
    this.modeSelect = toolbar.createEl("select", { cls: "xd-translator-view-select" });
    setSelectOptions(this.modeSelect, VIEW_MODE_OPTIONS, this.mode);
    this.modeSelect.onchange = async () => {
      this.mode = this.modeSelect.value;
      this.provider = this.providerForMode(this.mode);
      this.syncLanguagesFromSettings();
      await this.saveViewState();
      this.render();
    };

    this.providerSelect = toolbar.createEl("select", { cls: "xd-translator-view-select" });
    this.renderProviderSelect();
    const autoLabel = toolbar.createEl("label", { cls: "xd-translator-view-auto-toggle" });
    this.autoToggleEl = autoLabel.createEl("input", { type: "checkbox" });
    this.autoToggleEl.checked = !!this.plugin.settings.viewAutoTranslate;
    autoLabel.toggleClass("is-active", this.autoToggleEl.checked);
    const autoBox = autoLabel.createSpan({ cls: "xd-translator-view-auto-box" });
    setIcon(autoBox, "check");
    autoLabel.createSpan({ text: "Auto" });
    this.autoToggleEl.onchange = async () => {
      this.plugin.settings.viewAutoTranslate = this.autoToggleEl.checked;
      this.plugin.lastAutoTranslateText = "";
      autoLabel.toggleClass("is-active", this.autoToggleEl.checked);
      await this.plugin.saveSettings();
    };

    const sourcePanel = root.createDiv({ cls: "xd-translator-view-panel xd-translator-view-source-panel" });
    const sourceHeader = sourcePanel.createDiv({ cls: "xd-translator-view-panel-header" });
    sourceHeader.createDiv({ cls: "xd-translator-view-panel-title", text: "Source" });
    this.fromSelect = sourceHeader.createEl("select", { cls: "xd-translator-view-select xd-translator-view-language" });
    setSelectOptions(this.fromSelect, this.languageOptions(), this.from);
    this.fromSelect.onchange = async () => {
      this.from = this.fromSelect.value;
      await this.saveViewState();
    };

    const inputWrap = sourcePanel.createDiv({ cls: "xd-translator-view-input-wrap" });
    this.inputEl = inputWrap.createEl("textarea", { cls: "xd-translator-view-textarea", attr: { placeholder: "Type here..." } });
    this.inputEl.value = this.inputText;
    this.inputEl.oninput = () => this.inputText = this.inputEl.value;
    this.inputEl.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        this.runTranslation();
      }
    });
    const clearButton = inputWrap.createEl("button", { cls: "xd-translator-view-float-action" });
    clearButton.title = "Clear";
    setIcon(clearButton, "x");
    clearButton.onclick = () => {
      this.translationSeq += 1;
      this.inputText = "";
      this.outputText = "";
      this.inputEl.value = "";
      this.renderOutput("");
    };

    const actionRow = root.createDiv({ cls: "xd-translator-view-actions" });
    const swapButton = actionRow.createEl("button", { cls: "xd-translator-view-round-button" });
    swapButton.title = "Swap languages";
    setIcon(swapButton, "arrow-left-right");
    swapButton.onclick = async () => this.swapLanguages();
    const translateButton = actionRow.createEl("button", { cls: "xd-translator-view-round-button" });
    translateButton.title = "Translate";
    setIcon(translateButton, "languages");
    translateButton.onclick = () => this.runTranslation();

    const translationPanel = root.createDiv({ cls: "xd-translator-view-panel xd-translator-view-translation-panel" });
    const translationHeader = translationPanel.createDiv({ cls: "xd-translator-view-panel-header" });
    translationHeader.createDiv({ cls: "xd-translator-view-panel-title", text: "Translation" });
    const detailsButton = translationHeader.createEl("button", { cls: "xd-translator-view-header-button xd-translator-view-details", text: "Details" });
    detailsButton.title = "Details";
    detailsButton.onclick = () => this.openDetails();
    this.toSelect = translationHeader.createEl("select", { cls: "xd-translator-view-select xd-translator-view-language" });
    setSelectOptions(this.toSelect, this.languageOptions(), this.to);
    this.toSelect.onchange = async () => {
      this.to = this.toSelect.value;
      await this.saveViewState();
    };

    this.outputWrap = translationPanel.createDiv({ cls: "xd-translator-view-output-wrap" });
    this.renderOutput(this.outputText);
  }

  renderProviderSelect() {
    const options = this.mode === MODE_AI
      ? Object.fromEntries(Object.entries(AI_PROVIDER_DEFINITIONS).map(([key, provider]) => [key, provider.label]))
      : Object.fromEntries(Object.entries(TRADITIONAL_PROVIDER_DEFINITIONS).map(([key, provider]) => [key, provider.label]));
    setSelectOptions(this.providerSelect, options, this.provider);
    this.providerSelect.onchange = async () => {
      this.provider = this.providerSelect.value;
      this.syncLanguagesFromSettings();
      await this.saveViewState();
      this.render();
    };
  }

  async swapLanguages() {
    const options = this.languageOptions();
    if (!(this.from in options) || !(this.to in options) || this.from === "auto" || this.from === "") {
      notice("Source language cannot be swapped from auto detect.");
      return;
    }
    const nextFrom = this.to;
    const nextTo = this.from;
    if (!(nextFrom in options) || !(nextTo in options)) return;
    this.from = nextFrom;
    this.to = nextTo;
    this.fromSelect.value = this.from;
    this.toSelect.value = this.to;
    await this.saveViewState();
  }

  runtimeSettings() {
    return settingsWithServiceLanguages(this.plugin.settings, this.service(), this.provider, this.from, this.to);
  }

  async runTranslation() {
    const text = cleanText(this.inputText);
    if (!text) {
      this.renderState("No text to translate.");
      return;
    }
    const seq = ++this.translationSeq;
    this.renderState("Translating...");
    try {
      const settings = this.runtimeSettings();
      const result = await this.translateCurrent(text, settings);
      if (seq !== this.translationSeq) return;
      this.outputText = result || "";
      this.renderOutput(this.outputText);
    } catch (error) {
      if (seq !== this.translationSeq) return;
      this.outputText = "";
      this.renderState(sanitizeError(error), true);
    }
  }

  async translateCurrent(text, settings) {
    const service = this.service();
    if (service === "youdao") return translateYoudao(text, settings, this.to);
    if (service === "microsoft") return translateMicrosoft(text, settings, this.to);
    if (service === "baidu") return translateBaidu(text, settings, this.to);
    return translateAi(text, settings);
  }

  async openDetails() {
    const text = cleanText(this.inputText);
    if (!text) {
      notice("No text to explain.");
      return;
    }
    const settings = this.runtimeSettings();
    if (this.service() !== "ai") {
      openExternalUrl(providerDetailsUrl(this.service(), text, settings, { microsoft: this.to, baidu: this.to }));
      return;
    }
    const seq = ++this.translationSeq;
    this.renderState("Loading details...");
    try {
      const result = await translateAiDetails(text, this.outputText, settings);
      if (seq !== this.translationSeq) return;
      this.outputText = result || "";
      this.renderOutput(this.outputText);
    } catch (error) {
      if (seq !== this.translationSeq) return;
      this.outputText = "";
      this.renderState(sanitizeError(error), true);
    }
  }

  renderState(message, error = false) {
    if (!this.outputWrap) return;
    this.outputWrap.empty();
    const scroll = this.outputWrap.createDiv({ cls: "xd-translator-view-output-scroll" });
    scroll.createDiv({ cls: `xd-translator-view-state${error ? " is-error" : ""}`, text: message });
  }

  renderOutput(text) {
    if (!this.outputWrap) return;
    this.outputWrap.empty();
    const scroll = this.outputWrap.createDiv({ cls: "xd-translator-view-output-scroll" });
    const result = scroll.createEl("pre", { cls: "xd-translator-view-output-text" });
    result.textContent = text || "Translation";
    if (text) addFloatingCopyButton(this.outputWrap, () => this.outputText);
  }
}

class TranslatorModal extends Modal {
  constructor(app, text, settings) {
    super(app);
    this.text = text;
    this.settings = settings;
    this.customTargets = {
      youdao: settings.providers.youdao.to || "zh-CHS",
      microsoft: settings.providers.microsoft.to || "zh-Hans",
      baidu: settings.providers.baidu.to || "zh",
      ai: settings.aiTargetLanguage || DEFAULT_TARGET_LANGUAGE
    };
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("translator-modal");
    contentEl.createDiv({ cls: "translator_title", text: "Translator" });
    const search = new Setting(contentEl).setClass("translator_search").addText((input) => {
      input.setValue(this.text).setPlaceholder("Text to translate").onChange((value) => {
        this.text = value;
      });
    });
    const resultHost = contentEl.createDiv({ cls: "translator-results" });
    const run = () => {
      if (!cleanText(this.text)) {
        resultHost.empty();
        resultHost.createDiv({ cls: "translator-state", text: "No text to translate." });
        return;
      }
      this.translate(resultHost);
    };
    search.addButton((button) => button.setIcon("search").setCta().onClick(run));
    run();
  }

  onClose() {
    this.contentEl.empty();
  }

  translate(resultHost) {
    resultHost.empty();
    createSourceBlock(resultHost, this.text);
    const services = servicesForSettings(this.settings);
    if (!services.length) {
      resultHost.createDiv({ cls: "translator-state", text: "No provider selected." });
      return;
    }
    for (const service of services) this.runService(service, resultHost);
  }

  runService(service, resultHost) {
    const block = createResultBlock(resultHost, this.serviceTitle(service));
    const detailsButton = block.actions.createEl("button", { cls: "translator-copy-button translator-details-button", text: "Details" });
    detailsButton.disabled = service === "ai";
    let currentResult = "";
    const renderResult = (value) => {
      currentResult = value || "";
      setTextResult(block.content, currentResult);
      if (currentResult) addFloatingCopyButton(block.content, () => currentResult);
    };
    detailsButton.onclick = () => this.openDetails(service, block.content, detailsButton, renderResult, currentResult);
    this.addTargetControl(service, block.actions);
    setLoading(block.content);
    this.translateService(service).then((result) => {
      if (service === "ai") detailsButton.disabled = false;
      renderResult(result);
    }).catch((error) => {
      if (service === "ai") detailsButton.disabled = true;
      setError(block.content, error);
    });
  }

  openDetails(service, content, detailsButton, renderResult, currentResult) {
    if (service !== "ai") {
      openExternalUrl(providerDetailsUrl(service, this.text, this.settings, this.customTargets));
      return;
    }
    detailsButton.disabled = true;
    setLoading(content, "Loading details...");
    this.translateAiDetails(currentResult).then((result) => {
      renderResult(result);
    }).catch((error) => {
      setError(content, error);
    }).finally(() => {
      detailsButton.disabled = false;
    });
  }

  serviceTitle(service) {
    if (service === "ai") return `AI - ${getAiProviderSettings(this.settings).definition.label}`;
    return TRADITIONAL_PROVIDER_DEFINITIONS[service]?.label || service;
  }

  addTargetControl(service, actions) {
    if (service === "youdao") {
      addInlineSelect(actions, YOUDAO_LANGUAGES, this.customTargets.youdao, (value) => this.customTargets.youdao = value);
    } else if (service === "microsoft") {
      addInlineSelect(actions, MICROSOFT_LANGUAGES, this.customTargets.microsoft, (value) => this.customTargets.microsoft = value);
    } else if (service === "baidu") {
      addInlineSelect(actions, BAIDU_LANGUAGES, this.customTargets.baidu, (value) => this.customTargets.baidu = value);
    } else if (service === "ai") {
      addInlineSelect(actions, LANGUAGE_OPTIONS, this.customTargets.ai, (value) => this.customTargets.ai = value);
    }
  }

  translateService(service) {
    if (service === "youdao") return translateYoudao(this.text, this.settings, this.customTargets.youdao);
    if (service === "microsoft") return translateMicrosoft(this.text, this.settings, this.customTargets.microsoft);
    if (service === "baidu") return translateBaidu(this.text, this.settings, this.customTargets.baidu);
    if (service === "ai") return translateAi(this.text, { ...this.settings, aiTargetLanguage: this.customTargets.ai });
    return Promise.resolve("");
  }

  translateAiDetails(translation) {
    return translateAiDetails(this.text, translation, { ...this.settings, aiTargetLanguage: this.customTargets.ai });
  }
}

class TranslatorPlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this.registerView(VIEW_TYPE_XD_TRANSLATOR, (leaf) => new TranslatorView(leaf, this));
    this.addSettingTab(new TranslatorSettingTab(this.app, this));
    this.addRibbonIcon("languages", "XD Translator", () => this.openTranslatorView());
    const selectionDocument = this.selectionDocument();
    const selectionWindow = this.selectionWindow();
    this.autoTranslatePressedKeys = new Set();
    this.registerDomEvent(selectionDocument, "selectionchange", () => {
      this.autoTranslateSelectionPending = true;
      this.scheduleAutoTranslateSelection();
    });
    this.registerDomEvent(selectionDocument, "mousedown", () => {
      this.autoTranslateMouseDown = true;
    });
    this.registerDomEvent(selectionDocument, "mouseup", () => this.releaseAutoTranslateMouse());
    this.registerDomEvent(selectionDocument, "keydown", (event) => {
      this.autoTranslatePressedKeys.add(this.autoTranslateKey(event));
    });
    this.registerDomEvent(selectionDocument, "keyup", (event) => this.releaseAutoTranslateKey(event));
    this.registerDomEvent(selectionWindow, "blur", () => this.clearAutoTranslateInputState());
    this.addCommand({
      id: "translate",
      name: "translate",
      editorCallback: (editor) => this.openTranslator(cleanText(editor.getSelection()))
    });
    this.addCommand({
      id: "open-translator-view",
      name: "Open translator view",
      callback: () => this.openTranslatorView()
    });
    this.addCommand({
      id: "translate-selection-in-view",
      name: "Translate selection in view",
      editorCallback: (editor) => this.openTranslatorView(cleanText(editor.getSelection()))
    });
  }

  onunload() {
    if (this.autoTranslateTimer) window.clearTimeout(this.autoTranslateTimer);
    if (this.autoTranslateStableTimer) window.clearTimeout(this.autoTranslateStableTimer);
  }

  async loadSettings() {
    this.settings = migrateSettings(await this.loadData());
    this.normalizeSettings();
  }

  normalizeSettings() {
    normalizeSettings(this.settings);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  openTranslator(text) {
    new TranslatorModal(this.app, text, this.settings).open();
  }

  async openTranslatorView(text) {
    let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_XD_TRANSLATOR)[0];
    if (!leaf) {
      leaf = this.app.workspace.getRightLeaf(false) || this.app.workspace.getLeaf(true);
      await leaf.setViewState({ type: VIEW_TYPE_XD_TRANSLATOR, active: true });
    }
    await this.app.workspace.revealLeaf(leaf);
    if (typeof text === "string" && text) {
      leaf.view?.setInput?.(text, true);
    }
  }

  selectionDocument() {
    if (typeof activeDocument !== "undefined" && activeDocument) return activeDocument;
    return document;
  }

  selectionWindow() {
    if (typeof activeWindow !== "undefined" && activeWindow) return activeWindow;
    return window;
  }

  autoTranslateKey(event) {
    return event?.code || event?.key || "unknown";
  }

  releaseAutoTranslateMouse() {
    this.autoTranslateMouseDown = false;
    this.schedulePendingAutoTranslateSelection();
  }

  releaseAutoTranslateKey(event) {
    this.autoTranslatePressedKeys.delete(this.autoTranslateKey(event));
    this.schedulePendingAutoTranslateSelection();
  }

  clearAutoTranslateInputState() {
    this.autoTranslateMouseDown = false;
    this.autoTranslatePressedKeys.clear();
    this.schedulePendingAutoTranslateSelection();
  }

  schedulePendingAutoTranslateSelection() {
    if (!this.isAutoTranslateInputActive() && this.autoTranslateSelectionPending) {
      this.scheduleAutoTranslateSelection();
    }
  }

  isAutoTranslateInputActive() {
    return !!this.autoTranslateMouseDown || !!this.autoTranslatePressedKeys?.size;
  }

  scheduleAutoTranslateSelection() {
    if (this.autoTranslateTimer) window.clearTimeout(this.autoTranslateTimer);
    if (this.autoTranslateStableTimer) window.clearTimeout(this.autoTranslateStableTimer);
    this.autoTranslateTimer = window.setTimeout(() => this.prepareAutoTranslateSelection(), 320);
  }

  prepareAutoTranslateSelection() {
    this.autoTranslateTimer = null;
    if (this.isAutoTranslateInputActive()) return;
    this.autoTranslateSelectionPending = false;
    if (!this.visibleTranslatorView()) return;
    const text = this.autoTranslateSelectionText();
    if (!text) {
      this.lastAutoTranslateText = "";
      return;
    }
    this.autoTranslateStableTimer = window.setTimeout(() => this.handleAutoTranslateSelection(text), 180);
  }

  handleAutoTranslateSelection(expectedText) {
    this.autoTranslateStableTimer = null;
    if (this.isAutoTranslateInputActive()) {
      this.autoTranslateSelectionPending = true;
      return;
    }
    const view = this.visibleTranslatorView();
    if (!view) return;
    const text = this.autoTranslateSelectionText();
    if (!text || text !== expectedText) return;
    if (text === this.lastAutoTranslateText) return;
    this.lastAutoTranslateText = text;
    view.setInput(text, true);
  }

  visibleTranslatorView() {
    if (!this.settings.viewAutoTranslate) return null;
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_XD_TRANSLATOR)) {
      const view = leaf.view;
      if (view?.getViewType?.() === VIEW_TYPE_XD_TRANSLATOR && this.isTranslatorViewVisible(view)) {
        return view;
      }
    }
    return null;
  }

  isTranslatorViewVisible(view) {
    const el = view?.containerEl?.querySelector?.(".xd-translator-view") || view?.containerEl;
    if (!el?.isConnected) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return false;
    const style = getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
  }

  autoTranslateSelectionText() {
    const doc = this.selectionDocument();
    const activeElement = doc.activeElement;
    if (this.shouldIgnoreAutoSelectionElement(activeElement)) return "";
    return this.windowSelectionText(doc) || this.editorSelectionText(activeElement);
  }

  windowSelectionText(doc) {
    const selection = doc.getSelection?.();
    if (!selection || selection.isCollapsed) return "";
    const text = cleanText(selection.toString());
    if (!text) return "";
    const anchor = this.nodeElement(selection.anchorNode);
    const focus = this.nodeElement(selection.focusNode);
    if (!anchor || !focus) return "";
    if (this.shouldIgnoreAutoSelectionElement(anchor) || this.shouldIgnoreAutoSelectionElement(focus)) return "";
    if (!this.isMarkdownSelectionElement(anchor) && !this.isMarkdownSelectionElement(focus)) return "";
    return text;
  }

  editorSelectionText(activeElement) {
    const text = cleanText(this.app.workspace.activeEditor?.editor?.getSelection?.());
    if (!text) return "";
    const activeLeafEl = this.app.workspace.activeLeaf?.view?.containerEl;
    if (activeLeafEl && activeElement instanceof Element && activeLeafEl.contains(activeElement)) return text;
    return "";
  }

  nodeElement(node) {
    if (!node) return null;
    if (node instanceof Element) return node;
    return node.parentElement || null;
  }

  shouldIgnoreAutoSelectionElement(element) {
    if (!(element instanceof Element)) return false;
    if (element.closest(".xd-translator-view, .translator-modal, .translator-settings")) return true;
    if (element.closest(".modal-container, .menu, .suggestion-container")) return true;
    if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(element.tagName)) return true;
    return element.isContentEditable && !element.closest(".cm-content");
  }

  isMarkdownSelectionElement(element) {
    return !!element.closest(".markdown-source-view, .markdown-preview-view, .markdown-reading-view, .markdown-rendered, .cm-editor");
  }
}

TranslatorPlugin.__test = {
  AI_PROVIDER_DEFINITIONS,
  DEFAULT_SETTINGS,
  MODE_AI,
  MODE_MIXED,
  MODE_TRADITIONAL,
  VIEW_TYPE_XD_TRANSLATOR,
  chatCompletionUrl,
  detectYoudaoDetailLanguage,
  deepMergeDefaults,
  getViewLanguage,
  getAiProviderSettings,
  migrateSettings,
  providerDetailsUrl,
  requestAiWithMessages,
  servicesForSettings,
  settingsWithServiceLanguages,
  translateAi,
  translateAiDetails,
  translateOpenAiCompatible,
  translateAnthropic,
  translateGemini
};

module.exports = TranslatorPlugin;
