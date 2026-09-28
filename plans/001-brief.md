# 001: Brief

## What

A public repo with three parts:

1. **The shell**, a Storybook template styled for designers.
2. **The guide**, a getting-started walkthrough that assumes no development
   experience.
3. **The skills**, agent instructions that set the kit up and fill it from
   Figma.

## Why

Storybook's default interface is built for engineers. Designers who now build
components with an agent end up with a component library that works but looks
like a developer tool, and paid documentation tools (zeroheight, Supernova)
document pictures of components, not the components themselves.

fibo's Storybook already solves the look. This project extracts that shell,
makes it configurable, and wraps it in skills so the agent does the setup.

## Who

A designer with a Figma file, Claude Code or Cursor, and little development
experience. The agent is their interface: they will ask it to "set up a
Storybook from my Figma file", not run commands themselves.

## The shell

Taken from fibo's `apps/storybook/.storybook` and `src/blocks`:

| From fibo                          | Becomes                                         |
| ---------------------------------- | ----------------------------------------------- |
| `theme.ts` (hand-copied hex)       | A manager theme generated from `brand.config.ts` |
| `manager-head.html` sidebar CSS    | The same, with fibo's colours swapped for variables |
| `manager.tsx` icons, status pills  | The same, icon map driven by config             |
| `theme-sync.ts`, `preview.tsx`     | Light and dark toggle, as is                    |
| `docs-container.tsx`, `typography.tsx` | Docs page layout and MDX typography         |
| `anatomy`, `guidelines`, `data-attributes` blocks | Docs blocks                      |

Stays in fibo: the welcome page, hero, pixel grid, sounds and the snail.

New for the kit:

- `brand.config.ts`: name, logo, fonts, accent. The only file a designer edits.
- Foundations pages (colour, type, spacing, radius) that render from the token
  CSS, so they update when tokens change.
- Page templates: Welcome, Getting started, Changelog.

## The skills

| Skill           | Does                                                                |
| --------------- | ------------------------------------------------------------------- |
| `setup`         | Scaffolds the template, installs, asks for name and logo, starts Storybook |
| `sync-tokens`   | Reads Figma variables through the Figma MCP, writes the token CSS   |
| `add-component` | Figma frame URL in; component, stories and docs page out            |
| `document`      | Writes usage and do/don't guidance in plain language                |
| `review`        | Checks token use, accessibility and missing states                 |
| `publish`       | Deploys to Vercel or Chromatic and returns a link                   |
| `upgrade`       | Bumps Storybook and repairs any sidebar selectors that broke        |

## Version 1

The shell, the guide, and three skills: `setup`, `sync-tokens`,
`add-component`.

Done when a designer who has never used Storybook goes from nothing to one
Figma component documented in the kit, without help, in about ten minutes.
Watch one do it; where they stall is version 2.

## Decisions

- **One stack**: React, Vite, Tailwind CSS 4, Storybook 10. Supporting every
  framework conflicts with "minimal development knowledge". The shell's chrome
  is framework-agnostic, so a later skill could restyle an existing Storybook.
- **Storybook pinned exactly.** The sidebar styling targets Storybook's
  internal class names and IDs. The `upgrade` skill is how version bumps
  happen.
- **Skills in `.agents/skills/`**, linked from `.claude/skills/`, written
  without tool-specific instructions so Claude Code and Cursor can both run
  them.
- **Separate repo**, not a fibo package. fibo stays a design system; this is a
  tool for making one.

## Open questions

- How Cursor discovers skills in a project, and whether it needs its own link
  alongside `.claude/skills/`. Verify before writing the first skill.
- Distribution: a GitHub template repo, `npm create storybook-kit` (the name is
  free on npm), or both.
- Component base: Base UI like fibo, or plain components with no primitives
  library.
- Licence. MIT is the default for this kind of project.
- Whether "storybook-kit" reads as an official Storybook product. Storybook's
  name is theirs; the README should say this is an independent project.
