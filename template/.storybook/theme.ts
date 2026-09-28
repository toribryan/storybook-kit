import { create } from "storybook/theming"

import { brand } from "../brand.config"

type Mode = "light" | "dark"

const fonts = {
  fontBase: `"${brand.fonts.sans}", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`,
  fontCode: `"${brand.fonts.mono}", ui-monospace, "SFMono-Regular", Menlo, monospace`,
}

function escape(text: string) {
  return text.replace(
    /[&<>"]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]!
  )
}

// Storybook renders brandTitle as HTML, so a text mark can use the brand font.
function mark(mode: Mode) {
  const logo = mode === "dark" ? brand.logoDark || brand.logo : brand.logo
  if (logo)
    return `<img src="${escape(logo)}" alt="${escape(brand.name)}" style="display:block;max-height:28px;max-width:100%">`
  return (
    `<span style="font:600 20px/1 ${escape(fonts.fontBase)};letter-spacing:-0.02em;color:${brand.chrome[mode].text}">` +
    `${escape(brand.name)}</span>`
  )
}

function theme(mode: Mode) {
  const c = brand.chrome[mode]
  return create({
    base: mode,
    ...fonts,
    brandTitle: mark(mode),
    brandUrl: brand.url || undefined,
    brandTarget: "_blank",
    colorPrimary: c.accent,
    colorSecondary: c.accent,
    appBg: c.background,
    appContentBg: c.background,
    appPreviewBg: c.background,
    appBorderColor: c.border,
    appBorderRadius: 8,
    textColor: c.text,
    textMutedColor: c.muted,
    textInverseColor: c.background,
    barBg: c.background,
    barTextColor: c.muted,
    barSelectedColor: c.text,
    barHoverColor: c.text,
    inputBg: mode === "dark" ? c.hover : c.background,
    inputBorder: c.border,
    inputTextColor: c.text,
    inputBorderRadius: 8,
  })
}

export const lightTheme = theme("light")
export const darkTheme = theme("dark")

/** Loads the brand fonts into whichever frame calls it: manager or preview. */
export function loadFonts() {
  if (!brand.fonts.stylesheet) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = brand.fonts.stylesheet
  document.head.append(link)
}

/*
 * manager-head.html styles the sidebar with these variables. They come from
 * the brand file rather than being written into the HTML, so a designer edits
 * colours in one place.
 */
export function chromeVariables() {
  const vars = (c: (typeof brand.chrome)[Mode]) =>
    `--kit-bg:${c.background};--kit-fg:${c.text};--kit-muted:${c.muted};--kit-hover:${c.hover};--kit-border:${c.border};`
  const style = document.createElement("style")
  style.textContent =
    `:root{${vars(brand.chrome.light)}--kit-font-sans:${fonts.fontBase};--kit-font-mono:${fonts.fontCode};}` +
    `:root[data-kit-theme="dark"]{${vars(brand.chrome.dark)}}`
  document.head.append(style)
}
