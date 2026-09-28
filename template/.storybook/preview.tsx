import React from "react"
import type { Preview } from "@storybook/react-vite"
import { addons } from "storybook/preview-api"

import "../src/docs/docs.css"
import { brand } from "../brand.config"
import { KitDocsContainer } from "../src/docs/blocks/docs-container"
import { mdxComponents } from "../src/docs/blocks/typography"
import { loadFonts } from "./theme"
import {
  readTheme,
  THEME_EVENT,
  THEME_REQUEST,
  type Theme,
} from "./theme-sync"

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

// Inline so the brand fonts win over the fallbacks in globals.css.
loadFonts()
document.documentElement.style.setProperty(
  "--font-sans",
  `"${brand.fonts.sans}", ui-sans-serif, system-ui, sans-serif`
)
document.documentElement.style.setProperty(
  "--font-mono",
  `"${brand.fonts.mono}", ui-monospace, monospace`
)

applyTheme(readTheme())
const channel = addons.getChannel()
channel.on(THEME_EVENT, applyTheme)
channel.emit(THEME_REQUEST)

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      sort: "requiredFirst",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      container: KitDocsContainer,
      components: mdxComponents,
      toc: {
        title: "On this page",
        headingSelector: "h2",
        disable: false,
      },
      canvas: {
        sourceState: "hidden",
      },
    },
    options: {
      storySort: {
        order: [
          "Welcome",
          "Foundations",
          ["Colors", "Typography"],
          "Components",
        ],
      },
    },
  },
  decorators: [
    // Docs canvases already pad their stories, so the wrapper only pads in
    // the standalone story view.
    (Story, context) => (
      <div
        className={
          context.viewMode === "docs"
            ? "bg-background text-foreground"
            : "min-h-24 bg-background p-6 text-foreground"
        }
      >
        <Story />
      </div>
    ),
  ],
}

export default preview
