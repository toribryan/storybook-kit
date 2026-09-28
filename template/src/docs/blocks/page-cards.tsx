import { ArrowRightIcon } from "lucide-react"

import { DocLink } from "./doc-link"

type Card = {
  /** A docs or story id, such as `components-button--docs`. */
  to: string
  title: string
  body: string
}

/** A grid of links to other pages, for landing pages. */
function PageCards({ cards }: { cards: Card[] }) {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map(({ to, title, body }) => (
        <DocLink
          key={to}
          to={to}
          className="group flex flex-col gap-2 rounded-2xl border border-border p-5 no-underline transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring-subtle focus-visible:outline-none"
        >
          <span className="flex items-center justify-between text-sm font-semibold text-foreground">
            {title}
            <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-sm leading-6 text-muted-foreground">
            {body}
          </span>
        </DocLink>
      ))}
    </div>
  )
}

export { PageCards }
