import type { ReactNode } from "react"
import {
  CheckIcon,
  InfoIcon,
  LightbulbIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

function UsageGuidelines({ guidelines }: { guidelines: ReactNode[] }) {
  return (
    <ul className="my-6 flex max-w-[68ch] flex-col border-y border-border">
      {guidelines.map((guideline, index) => (
        <li
          key={index}
          className="flex gap-4 border-b border-border py-3.5 text-base leading-7 text-muted-foreground last:border-b-0"
        >
          <span className="w-6 shrink-0 pt-px font-mono text-xs leading-7 text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-foreground">{guideline}</span>
        </li>
      ))}
    </ul>
  )
}

type Rule = {
  component: ReactNode
  description: ReactNode
}

function RuleCard({ rule, tone }: { rule: Rule; tone: "do" | "dont" }) {
  const isDo = tone === "do"
  return (
    <figure className="m-0 flex min-w-0 flex-col gap-3">
      <div
        className={cn(
          "relative flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted p-8",
          "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5",
          isDo ? "after:bg-success" : "after:bg-destructive"
        )}
      >
        {rule.component}
      </div>
      <figcaption className="flex flex-col gap-1">
        <span
          className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold",
            isDo ? "text-success" : "text-destructive"
          )}
        >
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-md",
              isDo
                ? "bg-success text-success-foreground"
                : "bg-destructive text-destructive-foreground"
            )}
          >
            {isDo ? (
              <CheckIcon className="size-3.5" strokeWidth={3} />
            ) : (
              <XIcon className="size-3.5" strokeWidth={3} />
            )}
          </span>
          {isDo ? "Do" : "Don't"}
        </span>
        <span className="text-sm leading-6 text-muted-foreground">
          {rule.description}
        </span>
      </figcaption>
    </figure>
  )
}

function ComponentRules({
  rules,
}: {
  rules: { positive: Rule; negative: Rule }[]
}) {
  return (
    <div className="my-8 flex flex-col gap-14">
      {rules.map((rule, index) => (
        <div key={index} className="grid gap-6 sm:grid-cols-2">
          <RuleCard rule={rule.positive} tone="do" />
          <RuleCard rule={rule.negative} tone="dont" />
        </div>
      ))}
    </div>
  )
}

const TIP_TONES = {
  tip: {
    icon: LightbulbIcon,
    title: "Tip",
    className: "border-border bg-muted text-foreground",
  },
  info: {
    icon: InfoIcon,
    title: "Note",
    className: "border-transparent bg-info-subtle text-info",
  },
  warning: {
    icon: TriangleAlertIcon,
    title: "Heads up",
    className: "border-transparent bg-warning-subtle text-warning",
  },
}

function Tip({
  tone = "tip",
  title,
  children,
}: {
  tone?: keyof typeof TIP_TONES
  title?: string
  children: ReactNode
}) {
  const { icon: Icon, title: fallback, className } = TIP_TONES[tone]
  return (
    <aside
      className={cn(
        "my-6 flex max-w-[68ch] gap-3 rounded-xl border px-4 py-3.5",
        className
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="flex flex-col gap-1 text-sm leading-6">
        <strong className="font-semibold">{title ?? fallback}</strong>
        <div className="text-foreground [&_p]:m-0 [&_p]:text-sm [&_p]:leading-6 [&_p]:text-foreground">
          {children}
        </div>
      </div>
    </aside>
  )
}

export { UsageGuidelines, ComponentRules, Tip }
