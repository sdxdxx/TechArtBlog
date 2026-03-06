import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { version } from "../../package.json"

const socialLinks: Record<string, string> = {
  ArtStation: "https://sdxdxx007.artstation.com/",
  YouTube: "https://www.youtube.com/@SDXDXX",
  Zhihu: "https://www.zhihu.com/people/sha-dong-xi-da-xing-xing/posts",
  Bilibili: "https://space.bilibili.com/58940311",
}

const inlineStyle = `
.social-footer {
  margin-top: 8rem;
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  z-index: 3;
}

.social-footer .social-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.social-footer .social-links a {
  color: var(--secondary);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
  pointer-events: auto;
}

.social-footer .social-links a:hover {
  color: var(--tertiary);
  text-decoration: underline;
}

.social-footer .social-meta {
  margin-top: 1.25rem;
  font-size: 0.8rem;
  opacity: 0.8;
}
`

interface Options {
  links?: Record<string, string>
}

export default ((_opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = socialLinks

    return (
      <footer class={`${displayClass ?? ""} social-footer`}>
        <style>{inlineStyle}</style>
        <ul class="social-links">
          {Object.entries(links).map(([text, link]) => (
            <li key={text}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {text}
              </a>
            </li>
          ))}
        </ul>
        <p class="social-meta">
          Created with{" "}
          <a href="https://quartz.jzhao.xyz/" target="_blank" rel="noopener noreferrer">
            Quartz v{version}
          </a>{" "}
          © {year}
        </p>
      </footer>
    )
  }

  return Footer
}) satisfies QuartzComponentConstructor
