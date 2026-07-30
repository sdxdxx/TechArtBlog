import { QuartzTransformerPlugin } from "../types"
import rehypePrettyCode, { Options as CodeOptions, Theme as CodeTheme } from "rehype-pretty-code"
import { bundledLanguagesInfo } from "shiki"
import { Code, Root as MarkdownRoot } from "mdast"
import { Element, Root as HtmlRoot } from "hast"
import { visit } from "unist-util-visit"

interface Theme extends Record<string, CodeTheme> {
  light: CodeTheme
  dark: CodeTheme
}

interface Options {
  theme?: Theme
  keepBackground?: boolean
}

const defaultOptions: Options = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
}

interface CodeBlockMetadata {
  language: string
  title: string
}

const languageNames = new Map<string, string>()
for (const language of bundledLanguagesInfo) {
  languageNames.set(language.id.toLowerCase(), language.name)
  for (const alias of language.aliases ?? []) languageNames.set(alias.toLowerCase(), language.name)
}

function parseTitle(meta?: string | null): string {
  if (!meta) return ""
  const match = /(?:^|\s)title(?::|=)(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|([^\s]+))/i.exec(
    meta,
  )
  const value = match?.[1] ?? match?.[2] ?? match?.[3] ?? ""
  return value.replace(/\\([\\'"])/g, "$1")
}

function displayLanguage(language: string): string {
  if (!language) return "Plain Text"
  return languageNames.get(language.toLowerCase()) ?? language
}

function copyButton(): Element {
  return {
    type: "element",
    tagName: "button",
    properties: {
      type: "button",
      className: ["clipboard-button"],
      "aria-label": "Copy source",
    },
    children: [
      {
        type: "element",
        tagName: "svg",
        properties: {
          "aria-hidden": "true",
          height: 16,
          width: 16,
          viewBox: "0 0 16 16",
        },
        children: [
          {
            type: "element",
            tagName: "path",
            properties: {
              fillRule: "evenodd",
              d: "M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z",
            },
            children: [],
          },
        ],
      },
    ],
  }
}

function codeHeader(metadata: CodeBlockMetadata): Element {
  const label = displayLanguage(metadata.language)
  const children: Element["children"] = [
    {
      type: "element",
      tagName: "span",
      properties: { className: ["xdcr-code-language"] },
      children: [{ type: "text", value: label }],
    },
  ]
  if (metadata.title) {
    children.push(
      { type: "text", value: " \u00b7 " },
      {
        type: "element",
        tagName: "span",
        properties: { className: ["xdcr-code-title"], title: metadata.title },
        children: [{ type: "text", value: metadata.title }],
      },
    )
  }
  return {
    type: "element",
    tagName: "div",
    properties: { className: ["xdcr-code-header"] },
    children: [
      {
        type: "element",
        tagName: "div",
        properties: { className: ["xdcr-code-metadata"] },
        children,
      },
      {
        type: "element",
        tagName: "div",
        properties: { className: ["xdcr-code-actions"] },
        children: [copyButton()],
      },
    ],
  }
}

export const SyntaxHighlighting: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts: CodeOptions = { ...defaultOptions, ...userOpts }

  return {
    name: "SyntaxHighlighting",
    markdownPlugins() {
      return [
        () => (tree: MarkdownRoot, file) => {
          const blocks: CodeBlockMetadata[] = []
          visit(tree, "code", (node: Code) => {
            blocks.push({ language: node.lang?.trim() ?? "", title: parseTitle(node.meta) })
          })
          file.data.codeBlockMetadata = blocks
        },
      ]
    },
    htmlPlugins() {
      return [
        [rehypePrettyCode, opts],
        () => (tree: HtmlRoot, file) => {
          const blocks = file.data.codeBlockMetadata ?? []
          let blockIndex = 0
          visit(tree, "element", (node: Element) => {
            if (
              node.tagName !== "figure" ||
              !("data-rehype-pretty-code-figure" in (node.properties ?? {}))
            ) {
              return
            }
            const metadata = blocks[blockIndex++]
            if (!metadata || metadata.language.toLowerCase() === "mermaid") return
            const classes = (node.properties.className ?? []) as string[]
            node.properties.className = [...classes, "xdcr-code-frame"]
            node.children.unshift(codeHeader(metadata))
          })
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    codeBlockMetadata: CodeBlockMetadata[]
  }
}
