import { useSyncExternalStore, type ReactNode } from "react"
import {
  DocsContainer,
  Unstyled,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks"
import { BugIcon } from "lucide-react"

import { darkTheme, lightTheme } from "../../../.storybook/theme"
import { brand } from "../../../brand.config"
import { FigmaIcon } from "./figma-icon"

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

/*
 * The preview flips `.dark` on the document when the toolbar changes. The
 * container reads that class so Storybook's own blocks (canvases, the props
 * table, code) switch with the page.
 */
function useIsDark() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false
  )
}

function Footer() {
  const cards = [
    {
      href: brand.links.github && `${brand.links.github}/issues/new`,
      icon: BugIcon,
      title: "Report a bug",
      body: "Something broken or off-spec? Open an issue on GitHub.",
    },
    {
      href: brand.links.figma,
      icon: FigmaIcon,
      title: "Open the Figma library",
      body: "Every component here has a matching Figma component.",
    },
  ].filter((card) => card.href)
  if (cards.length === 0) return null
  return (
    <footer className="mt-28 flex flex-col gap-6 border-t border-border pt-10">
      <div className="flex flex-col gap-1">
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Found something off?
        </span>
        <span className="text-sm text-muted-foreground">
          Feedback shapes what gets added next.
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(({ href, icon: Icon, title, body }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-4 rounded-2xl border border-border p-5 no-underline transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring-subtle focus-visible:outline-none"
          >
            <Icon className="mt-0.5 size-5 shrink-0 text-foreground" />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-foreground">
                {title}
              </span>
              <span className="text-sm text-muted-foreground">{body}</span>
            </span>
          </a>
        ))}
      </div>
    </footer>
  )
}

function KitDocsContainer({
  children,
  context,
}: DocsContainerProps & { children: ReactNode }) {
  const dark = useIsDark()
  return (
    <DocsContainer context={context} theme={dark ? darkTheme : lightTheme}>
      <Unstyled>
        <div className="kit-docs font-sans text-foreground antialiased">
          {children}
          <Footer />
        </div>
      </Unstyled>
    </DocsContainer>
  )
}

export { KitDocsContainer }
