import type { ReactNode } from "react"

type Part = {
  name: string
  slot?: string
  note?: ReactNode
  children?: Part[]
}

type Row = {
  part: Part
  /** For each ancestor level, whether that ancestor has siblings below it. */
  rails: boolean[]
  last: boolean
}

function flatten(parts: Part[], rails: boolean[] = []): Row[] {
  return parts.flatMap((part, index) => {
    const last = index === parts.length - 1
    return [
      { part, rails, last },
      ...flatten(part.children ?? [], [...rails, !last]),
    ]
  })
}

const INSET = 20
const STEP = 20
const guideLeft = (level: number) => INSET + level * STEP + 7

/**
 * The guide lines are borders rather than box-drawing glyphs, so they join
 * across rows whatever the row height.
 */
function Guides({ rails, last }: { rails: boolean[]; last: boolean }) {
  const own = guideLeft(rails.length)
  return (
    <>
      {rails.map((rail, level) =>
        rail ? (
          <span
            key={level}
            aria-hidden="true"
            className="absolute inset-y-0 border-l border-muted-foreground"
            style={{ left: guideLeft(level) }}
          />
        ) : null
      )}
      <span
        aria-hidden="true"
        className={
          last
            ? "absolute top-0 h-[1.125rem] w-2.5 rounded-bl-sm border-b border-l border-muted-foreground"
            : "absolute inset-y-0 border-l border-muted-foreground"
        }
        style={{ left: own }}
      />
      {last ? null : (
        <span
          aria-hidden="true"
          className="absolute top-[1.125rem] w-2.5 border-t border-muted-foreground"
          style={{ left: own }}
        />
      )}
    </>
  )
}

/**
 * The rendered parts of a component as a tree, each with the `data-slot` it
 * carries and what it is for. Only elements that exist in the DOM belong
 * here, so a reader can match every row to something in dev tools.
 */
function Anatomy({ root }: { root: Part }) {
  const rows = flatten(root.children ?? [])
  const mono = "font-mono text-[0.8125rem] whitespace-nowrap"
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-xl border-collapse text-left">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="px-5 py-2.5 font-medium">Part</th>
            <th className="px-5 py-2.5 font-medium">data-slot</th>
            <th className="px-5 py-2.5 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody className="text-sm leading-6">
          <tr className="align-top">
            <td
              className={`px-5 pt-3 pb-1.5 font-medium text-foreground ${mono}`}
            >
              {root.name}
            </td>
            <td className={`px-5 pt-3 pb-1.5 text-muted-foreground ${mono}`}>
              {root.slot}
            </td>
            <td className="px-5 pt-3 pb-1.5 text-muted-foreground">
              {root.note}
            </td>
          </tr>
          {rows.map(({ part, rails, last }, index) => (
            <tr key={index} className="align-top">
              <td
                className={`relative py-1.5 pr-5 text-foreground ${mono}`}
                style={{ paddingLeft: guideLeft(rails.length) + 16 }}
              >
                <Guides rails={rails} last={last} />
                {part.name}
              </td>
              <td className={`px-5 py-1.5 text-muted-foreground ${mono}`}>
                {part.slot}
              </td>
              <td className="px-5 py-1.5 text-muted-foreground">{part.note}</td>
            </tr>
          ))}
          <tr aria-hidden="true">
            <td colSpan={3} className="h-1.5 p-0" />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export { Anatomy }
