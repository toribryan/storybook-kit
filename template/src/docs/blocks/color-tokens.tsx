import type { ReactNode } from "react"

import globals from "@/styles/globals.css?raw"

/*
 * Everything on the Colors page is read from globals.css itself, so the
 * tables can't drift from the code: each semantic token's light and dark
 * value, and the Tailwind primitive it points at.
 */

type Values = Record<string, string>

// The top-level `:root` and `.dark` blocks that hold the semantic roles.
// Base-layer blocks are indented, so anchoring at the line start skips them.
function block(selector: string): Values {
  const match = new RegExp(`^${selector} \\{([\\s\\S]*?)^\\}`, "m").exec(
    globals
  )
  const values: Values = {}
  for (const [, name, value] of match?.[1]?.matchAll(
    /--([\w-]+):\s*([^;]+);/g
  ) ?? [])
    // Prettier wraps long values over lines; fold them back onto one.
    values[name!] = value!
      .replace(/\s+/g, " ")
      .replace(/\(\s/g, "(")
      .replace(/\s\)/g, ")")
      .trim()
  return values
}

const LIGHT = block(":root")
const DARK = block("\\.dark")

/*
 * What a value is, in Tailwind's words: `var(--color-neutral-900)` is
 * neutral-900, a color mixed with transparent is that color at an alpha,
 * and a literal white at an alpha is written as such.
 */
function primitive(value: string | undefined) {
  if (!value) return ""
  const mix =
    /color-mix\(in oklch, var\(--color-([\w-]+)\) (\d+)%, transparent\)/.exec(
      value
    )
  if (mix) return `${mix[1]} at ${mix[2]}%`
  const ref = /^var\(--color-([\w-]+)\)$/.exec(value)
  if (ref) return ref[1]!
  const white = /^oklch\(1 0 0 \/ (\d+)%\)$/.exec(value)
  if (white) return `white at ${white[1]}%`
  return value
}

type Token = {
  name: string
  /** The class a component writes. */
  utility: string
  use: ReactNode
}

type Family = {
  title: string
  description: ReactNode
  tokens: Token[]
}

// A mode's value shown over that mode's page, so translucent roles read the
// way they do in use.
function Swatch({ mode, name }: { mode: "light" | "dark"; name: string }) {
  const values = mode === "dark" ? DARK : LIGHT
  const value = values[name]
  return (
    <div className="flex w-28 flex-col gap-1.5">
      <span
        className="block rounded-md border border-border p-1"
        style={{ background: values.background }}
      >
        <span
          className="block h-8 rounded-sm"
          style={{ background: value }}
          aria-hidden="true"
        />
      </span>
      <span className="font-mono text-xs text-muted-foreground">
        {primitive(value)}
      </span>
    </div>
  )
}

function TokenTable({ family }: { family: Family }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full min-w-2xl border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-foreground">
            <th className="py-2.5 pr-4 font-medium">Token</th>
            <th className="w-32 py-2.5 pr-4 font-medium">Light</th>
            <th className="w-32 py-2.5 pr-4 font-medium">Dark</th>
            <th className="py-2.5 font-medium">Used for</th>
          </tr>
        </thead>
        <tbody>
          {family.tokens.map((token) => (
            <tr
              key={token.name}
              className="border-b border-border align-top last:border-b-0"
            >
              <td className="py-3 pr-4">
                <div className="flex flex-col gap-1">
                  <code className="w-fit rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] whitespace-nowrap text-foreground">
                    {token.utility}
                  </code>
                  <span className="font-mono text-xs text-muted-foreground">
                    --{token.name}
                  </span>
                </div>
              </td>
              <td className="py-3 pr-4">
                <Swatch mode="light" name={token.name} />
              </td>
              <td className="py-3 pr-4">
                <Swatch mode="dark" name={token.name} />
              </td>
              <td className="py-3 leading-6 text-muted-foreground">
                {token.use}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const FAMILIES: Record<string, Family> = {
  surfaces: {
    title: "Surfaces",
    description: "The planes content sits on, from the page up to popovers.",
    tokens: [
      { name: "background", utility: "bg-background", use: "The page." },
      {
        name: "card",
        utility: "bg-card",
        use: "Cards and panels. Lifts off the page in dark mode.",
      },
      {
        name: "popover",
        utility: "bg-popover",
        use: "Menus, lists and toasts that float over content.",
      },
      {
        name: "popover-overlay",
        utility: "bg-popover-overlay",
        use: "The scrim behind a dialog.",
      },
      {
        name: "muted",
        utility: "bg-muted",
        use: "Quiet fills: code, skeletons, avatars without a photo.",
      },
      {
        name: "secondary",
        utility: "bg-secondary",
        use: "Secondary buttons and badges.",
      },
      {
        name: "accent",
        utility: "bg-accent",
        use: "The highlighted row in a list or menu.",
      },
    ],
  },
  text: {
    title: "Text",
    description:
      "Each foreground pairs with the surface of the same name. Muted text is for secondary copy on the page, not on a muted fill.",
    tokens: [
      { name: "foreground", utility: "text-foreground", use: "Body text." },
      {
        name: "muted-foreground",
        utility: "text-muted-foreground",
        use: "Descriptions, hints, placeholders and captions.",
      },
      {
        name: "primary-foreground",
        utility: "text-primary-foreground",
        use: "Text and icons on a primary fill.",
      },
      {
        name: "secondary-foreground",
        utility: "text-secondary-foreground",
        use: "Text on a secondary fill.",
      },
      {
        name: "accent-foreground",
        utility: "text-accent-foreground",
        use: "Text on a highlighted row.",
      },
    ],
  },
  actions: {
    title: "Actions",
    description:
      "The strongest action on a screen, and its hover and selected states.",
    tokens: [
      {
        name: "primary",
        utility: "bg-primary",
        use: "The main action on a screen, selected controls, the checked state.",
      },
      {
        name: "primary-hover",
        utility: "hover:bg-primary-hover",
        use: "Primary on hover.",
      },
      {
        name: "primary-subtle",
        utility: "bg-primary-subtle",
        use: "A faint wash of primary, for selected rows.",
      },
      {
        name: "secondary-hover",
        utility: "hover:bg-secondary-hover",
        use: "Secondary on hover.",
      },
    ],
  },
  status: {
    title: "Status",
    description:
      "Each status color means one thing. A solid tone for text, icons and fills, and a translucent -subtle tone for the background behind them.",
    tokens: [
      {
        name: "destructive",
        utility: "text-destructive",
        use: "Errors, and actions that delete or can't be undone.",
      },
      {
        name: "destructive-subtle",
        utility: "bg-destructive-subtle",
        use: "Behind destructive text: the destructive button, error rows.",
      },
      {
        name: "destructive-ring",
        utility: "ring-destructive-ring",
        use: "The focus ring on an invalid field.",
      },
      {
        name: "success",
        utility: "text-success",
        use: "Something finished or is healthy.",
      },
      {
        name: "success-subtle",
        utility: "bg-success-subtle",
        use: "Behind success text.",
      },
      {
        name: "warning",
        utility: "text-warning",
        use: "Something needs attention soon.",
      },
      {
        name: "warning-subtle",
        utility: "bg-warning-subtle",
        use: "Behind warning text.",
      },
      {
        name: "info",
        utility: "text-info",
        use: "Neutral news: an update, a tip.",
      },
      {
        name: "info-subtle",
        utility: "bg-info-subtle",
        use: "Behind info text.",
      },
    ],
  },
  lines: {
    title: "Lines and focus",
    description: "Borders, field edges, the fill inside fields, and focus.",
    tokens: [
      {
        name: "border",
        utility: "border-border",
        use: "Dividers and the edges of cards and popovers.",
      },
      {
        name: "input",
        utility: "border-input",
        use: "The edge of a field, checkbox or radio.",
      },
      {
        name: "input-subtle",
        utility: "bg-input-subtle",
        use: "The faint fill inside fields and outline buttons.",
      },
      {
        name: "input-subtle-hover",
        utility: "hover:bg-input-subtle-hover",
        use: "That fill on hover.",
      },
      {
        name: "ring",
        utility: "border-ring",
        use: "The edge of a focused field.",
      },
      {
        name: "ring-subtle",
        utility: "ring-ring-subtle",
        use: "The soft 3px halo around anything focused.",
      },
    ],
  },
  charts: {
    title: "Charts",
    description:
      "Five neutral steps for data series, light to dark. A chart that needs to say good or bad uses the status colors instead.",
    tokens: [1, 2, 3, 4, 5].map((i) => ({
      name: `chart-${i}`,
      utility: `bg-chart-${i}`,
      use: `Series ${i}.`,
    })),
  },
}

function TokenFamily({ name }: { name: keyof typeof FAMILIES }) {
  const family = FAMILIES[name]!
  return (
    <>
      <p className="max-w-[68ch] text-muted-foreground">{family.description}</p>
      <TokenTable family={family} />
    </>
  )
}

export { TokenFamily }
