import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const CustomFrontmatter: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const url = fileData.frontmatter?.url
  if (url) {
    return (
      <div class={classNames(displayClass, "url-display")}>
        <a href={url} class="external-link" target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </div>
    )
  } else {
    return null
  }
}

CustomFrontmatter.css = `
.url-display {
  margin: 1rem 0;
}

.url-display .external-link {
  color: var(--link);
  text-decoration: underline;
  word-break: break-all;
}
`

export default (() => CustomFrontmatter) satisfies QuartzComponentConstructor
