import { execSync } from "node:child_process"
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const isLocalPreview = process.argv.includes("--serve")

function getCliArgValue(flagName: string): string | null {
  const directPrefix = `${flagName}=`
  for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i]
    if (arg === flagName) {
      const next = process.argv[i + 1]
      if (next && !next.startsWith("-")) return next
      return null
    }
    if (arg.startsWith(directPrefix)) {
      const value = arg.slice(directPrefix.length)
      return value.length > 0 ? value : null
    }
  }
  return null
}

function inferGitHubPagesBaseUrl(): string | null {
  // GitHub Actions: GITHUB_REPOSITORY="owner/repo"
  const githubRepository = process.env.GITHUB_REPOSITORY?.trim()
  if (githubRepository && githubRepository.includes("/")) {
    const [owner, repo] = githubRepository.split("/", 2)
    if (owner && repo) {
      return `${owner}.github.io/${repo}`
    }
  }

  // Local machine: infer from git remote origin
  try {
    const remoteUrl = execSync("git remote get-url origin", { encoding: "utf8" }).trim()
    const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?$/i)
    if (match) {
      const [, owner, repo] = match
      return `${owner}.github.io/${repo}`
    }
  } catch {
    // Ignore and fall back below.
  }

  return null
}

// Prefer env override so domain/repo renames do not require code edits.
// In local preview (--serve), always use root path to avoid subpath 404.
const cliBaseDir = getCliArgValue("--baseDir")?.replace(/^\/+|\/+$/g, "") ?? ""
const localBaseUrl = cliBaseDir.length > 0 ? `localhost/${cliBaseDir}` : "localhost"
const inferredProdBaseUrl = inferGitHubPagesBaseUrl()
const resolvedBaseUrl =
  process.env.QUARTZ_BASE_URL?.trim() ??
  (isLocalPreview ? localBaseUrl : inferredProdBaseUrl ?? "localhost")
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Xiaoxiao Deng",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: resolvedBaseUrl,
    ignorePatterns: ["private", "templates", ".obsidian", "Assets_Plugin"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
