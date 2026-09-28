import type { ComponentProps, MouseEvent } from "react"
import { SELECT_STORY } from "storybook/internal/core-events"
import { addons } from "storybook/preview-api"

type DocLinkProps = Omit<ComponentProps<"a">, "href"> & {
  /** A docs or story id, such as `components-button--docs`. */
  to: string
}

/*
 * Docs render inside the preview iframe, so a plain link would load the
 * manager inside itself. Clicks go through the channel for an in-place
 * navigation; the href stays real so cmd-click and copy link still work.
 */
function DocLink({ to, onClick, ...props }: DocLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.metaKey || event.ctrlKey) return
    event.preventDefault()
    addons.getChannel().emit(SELECT_STORY, { storyId: to })
  }

  const kind = to.endsWith("--docs") ? "docs" : "story"
  return (
    <a
      href={`./?path=/${kind}/${to}`}
      target="_top"
      onClick={handleClick}
      {...props}
    />
  )
}

export { DocLink }
