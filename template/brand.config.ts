/*
 * Your Storybook's name, logo, fonts and colors. This is the only file you
 * need to edit to make the Storybook look like yours.
 *
 * Docs pages update as soon as you save. The sidebar and toolbar are built
 * once when Storybook starts, so stop it and run `npm run storybook` again
 * to see changes there.
 *
 * The colors here are for the Storybook frame: the sidebar and toolbar.
 * Docs pages and components use the tokens in src/styles/globals.css.
 */

type Chrome = {
  /** The page and sidebar background. */
  background: string
  /** Headings, selected sidebar items and body text. */
  text: string
  /** Sidebar items, captions and secondary text. */
  muted: string
  /** The fill behind a sidebar item on hover. */
  hover: string
  /** Hairlines between the sidebar, toolbar and page. */
  border: string
  /** Links, focus and selected controls in Storybook's own panels. */
  accent: string
}

type Brand = {
  /** Shown at the top of the sidebar, and in the browser tab. */
  name: string
  /** Where clicking the logo goes. Leave empty to make the logo plain. */
  url: string
  /** An image in the public folder, such as "/logo.svg". Leave empty to show the name as text. */
  logo: string
  /** A version of the logo for dark mode. Leave empty to use `logo` in both. */
  logoDark: string
  fonts: {
    /** The font for text. */
    sans: string
    /** The font for code and token names. */
    mono: string
    /** A Google Fonts link that loads both. Leave empty if the fonts are installed another way. */
    stylesheet: string
  }
  chrome: { light: Chrome; dark: Chrome }
  /** Shown in the footer of every docs page. Leave a link empty to hide its card. */
  links: {
    figma: string
    github: string
  }
}

export const brand: Brand = {
  name: "Design system",
  url: "",
  logo: "",
  logoDark: "",
  fonts: {
    sans: "Geist",
    mono: "Geist Mono",
    stylesheet:
      "https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&display=swap",
  },
  chrome: {
    light: {
      background: "#ffffff",
      text: "#0a0a0a",
      muted: "#737373",
      hover: "#f5f5f5",
      border: "#e5e5e5",
      accent: "#171717",
    },
    dark: {
      background: "#0a0a0a",
      text: "#fafafa",
      muted: "#a3a3a3",
      hover: "#171717",
      border: "#262626",
      accent: "#fafafa",
    },
  },
  links: {
    figma: "",
    github: "",
  },
}
