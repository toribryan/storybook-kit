import type { ComponentProps, ReactNode } from "react"
import { CodeOrSourceMdx } from "@storybook/addon-docs/blocks"

import { cn } from "@/lib/utils"

/*
 * Markdown in every MDX page maps to these through `docs.components`, so a
 * page is written in plain markdown and still lands on the same type scale.
 * Section headings get slug ids for the "On this page" rail.
 */
function slug(children: ReactNode) {
  if (typeof children !== "string") return undefined
  return children
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function H1({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "mb-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl",
        className
      )}
      {...props}
    />
  )
}

function H2({ className, id, children, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      id={id ?? slug(children)}
      className={cn(
        "mt-20 mb-6 scroll-mt-8 text-2xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-[1.75rem]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

function H3({ className, id, children, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      id={id ?? slug(children)}
      className={cn(
        "mt-10 mb-3 scroll-mt-8 text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

function P({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "my-4 max-w-[68ch] text-base leading-7 text-pretty text-muted-foreground [h1+&]:text-lg [h1+&]:leading-8",
        className
      )}
      {...props}
    />
  )
}

function Ul({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "my-4 flex max-w-[68ch] list-disc flex-col gap-2 pl-5 text-base leading-7 text-muted-foreground marker:text-border",
        className
      )}
      {...props}
    />
  )
}

function Ol({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "my-4 flex max-w-[68ch] list-decimal flex-col gap-2 pl-5 text-base leading-7 text-muted-foreground marker:font-mono marker:text-sm",
        className
      )}
      {...props}
    />
  )
}

function A({ className, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
        className
      )}
      {...props}
    />
  )
}

function Code({ className, ...props }: ComponentProps<"code">) {
  // Fenced blocks arrive here too; they keep Storybook's highlighted source.
  if (className?.includes("language-") || String(props.children).includes("\n"))
    return <CodeOrSourceMdx className={className} {...props} />
  return (
    <code
      className={cn(
        "rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground",
        className
      )}
      {...props}
    />
  )
}

function Hr() {
  return <hr className="my-12 border-border" />
}

function Strong({ className, ...props }: ComponentProps<"strong">) {
  return (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  a: A,
  code: Code,
  hr: Hr,
  strong: Strong,
}

export { H1, H2, H3, P, Ul, Ol, A, Code, mdxComponents }
