import path from "path"
import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import { FullSlug, pathToRoot, resolveRelative } from "../../util/path"
import { defaultContentPageLayout, sharedPageComponents } from "../../../quartz.layout"
import { Content } from "../../components"
import { styleText } from "util"
import { write } from "./helpers"
import { BuildCtx } from "../../util/ctx"
import { Node } from "unist"
import { StaticResources } from "../../util/resources"
import { QuartzPluginData } from "../vfile"

const INDEX_SLUG = "index" as FullSlug

function isRootHomeSlug(slug: string): boolean {
  return slug.toLowerCase() === "home"
}

function findRootHomeSlug(allFiles: QuartzPluginData[]): FullSlug | null {
  const homeFile = allFiles.find((file) => file.slug && isRootHomeSlug(file.slug))
  return (homeFile?.slug as FullSlug | undefined) ?? null
}

async function writeRootIndexRedirect(ctx: BuildCtx, homeSlug: FullSlug) {
  const redirectUrl = resolveRelative(INDEX_SLUG, homeSlug)
  return write({
    ctx,
    slug: INDEX_SLUG,
    ext: ".html",
    content: `<!DOCTYPE html>
<html lang="en-us">
<head>
<title>${homeSlug}</title>
<link rel="canonical" href="${redirectUrl}">
<meta name="robots" content="noindex">
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${redirectUrl}">
</head>
</html>
`,
  })
}

async function processContent(
  ctx: BuildCtx,
  tree: Node,
  fileData: QuartzPluginData,
  allFiles: QuartzPluginData[],
  opts: FullPageLayout,
  resources: StaticResources,
) {
  const slug = fileData.slug!
  const cfg = ctx.cfg.configuration
  const externalResources = pageResources(pathToRoot(slug), resources)
  const componentData: QuartzComponentProps = {
    ctx,
    fileData,
    externalResources,
    cfg,
    children: [],
    tree,
    allFiles,
  }

  const content = renderPage(cfg, slug, componentData, opts, externalResources)
  return write({
    ctx,
    content,
    slug,
    ext: ".html",
  })
}

export const ContentPage: QuartzEmitterPlugin<Partial<FullPageLayout>> = (userOpts) => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultContentPageLayout,
    pageBody: Content(),
    ...userOpts,
  }

  const { head: Head, header, beforeBody, pageBody, afterBody, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "ContentPage",
    getQuartzComponents() {
      return [
        Head,
        Header,
        Body,
        ...header,
        ...beforeBody,
        pageBody,
        ...afterBody,
        ...left,
        ...right,
        Footer,
      ]
    },
    async *emit(ctx, content, resources) {
      const allFiles = content.map((c) => c[1].data)
      let containsIndex = false
      const rootHomeSlug = findRootHomeSlug(allFiles)

      for (const [tree, file] of content) {
        const slug = file.data.slug!
        if (slug === INDEX_SLUG) {
          containsIndex = true
        }

        // only process home page, non-tag pages, and non-index pages
        if (slug.endsWith("/index") || slug.startsWith("tags/")) continue
        yield processContent(ctx, tree, file.data, allFiles, opts, resources)
      }

      if (!containsIndex && rootHomeSlug) {
        yield writeRootIndexRedirect(ctx, rootHomeSlug)
      } else if (!containsIndex) {
        console.log(
          styleText(
            "yellow",
            `\nWarning: you seem to be missing a root home page file. Add \`index.md\` or \`Home.md\` under \`${ctx.argv.directory}\` (\`${path.join(ctx.argv.directory, "index.md")}\` / \`${path.join(ctx.argv.directory, "Home.md")}\`). This may cause errors when deploying.`,
          ),
        )
      }
    },
    async *partialEmit(ctx, content, resources, changeEvents) {
      const allFiles = content.map((c) => c[1].data)
      const containsIndex = allFiles.some((file) => file.slug === INDEX_SLUG)
      const rootHomeSlug = findRootHomeSlug(allFiles)

      // find all slugs that changed or were added
      const changedSlugs = new Set<string>()
      for (const changeEvent of changeEvents) {
        if (!changeEvent.file) continue
        if (changeEvent.type === "add" || changeEvent.type === "change") {
          changedSlugs.add(changeEvent.file.data.slug!)
        }
      }

      for (const [tree, file] of content) {
        const slug = file.data.slug!
        if (!changedSlugs.has(slug)) continue
        if (slug.endsWith("/index") || slug.startsWith("tags/")) continue

        yield processContent(ctx, tree, file.data, allFiles, opts, resources)
      }

      if (
        !containsIndex &&
        rootHomeSlug &&
        (changedSlugs.has(rootHomeSlug) || changedSlugs.has(INDEX_SLUG))
      ) {
        yield writeRootIndexRedirect(ctx, rootHomeSlug)
      }
    },
  }
}
