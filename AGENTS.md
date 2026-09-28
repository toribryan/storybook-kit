# storybook-kit

A pre-styled Storybook template, a getting-started guide, and agent skills for
designers who build from Figma with an AI agent. The brief is
`plans/001-brief.md`.

## Audience

Every decision starts from one reader: a designer with a Figma file, an agent
open, and little development experience. If a step needs them to edit a config
file other than `brand.config.ts`, read a stack trace, or know what Vite is,
the step is not finished.

## Layout

| Path              | Holds                                                   |
| ----------------- | ------------------------------------------------------- |
| `template/`       | The Storybook project a designer gets                   |
| `docs/`           | The getting-started guide                               |
| `.agents/skills/` | Agent skills, one folder each; `.claude/skills/` links here |
| `plans/`          | Numbered design docs, see `plans/README.md`             |

## Conventions

- **One stack.** React, Vite, Tailwind CSS 4, Storybook 10. Node 24, pinned in
  `.nvmrc`. Storybook's version is pinned exactly, because the shell styles
  Storybook's internal DOM and a minor release can break it.
- **Skills work in Claude Code and Cursor.** Write them as plain `SKILL.md`
  folders under `.agents/skills/` and keep tool-specific instructions out of
  them.
- **Writing.** Sentence case for headings and UI copy. Plain words over
  jargon; when a technical term is unavoidable, explain it the first time.
  Comments explain why, never what. No emojis in code, comments or commit
  messages.
- **Commits.** No AI attribution lines in commit messages or pull requests.
