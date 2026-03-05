// @ts-ignore
import script from "./scripts/lightbox.inline"
import style from "./styles/lightbox.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const Lightbox: QuartzComponent = () => {
  return null
}

Lightbox.afterDOMLoaded = script
Lightbox.css = style

export default (() => Lightbox) satisfies QuartzComponentConstructor
