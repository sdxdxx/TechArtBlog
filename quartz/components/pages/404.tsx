import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // Always point "Return to Homepage" to the site root directory URL.
  // Keep trailing slash so subpath deployments (e.g. "/Portfolio/") resolve to index.
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const pathname = url.pathname || "/"
  const homeHref = pathname.endsWith("/") ? pathname : `${pathname}/`

  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={homeHref}>{i18n(cfg.locale).pages.error.home}</a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
