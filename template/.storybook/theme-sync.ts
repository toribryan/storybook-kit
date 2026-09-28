/*
 * The theme is not a Storybook global. Changing a global re-renders every
 * docs page under a fresh React key, so each component would mount already
 * in the new theme and never see the change. Instead the toolbar sends an
 * event and the preview flips `.dark` on the document, the way next-themes
 * does in a real app. Manager and preview share an origin, so both read the
 * saved choice from the same storage key on load.
 */
export const THEME_EVENT = "kit/theme"
export const THEME_REQUEST = "kit/theme-request"

export type Theme = "light" | "dark"

const KEY = "kit-theme"

export function readTheme(): Theme {
  try {
    const saved = window.localStorage.getItem(KEY)
    if (saved === "light" || saved === "dark") return saved
  } catch {
    // Storage can be blocked; fall back to the system preference.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function saveTheme(theme: Theme) {
  try {
    window.localStorage.setItem(KEY, theme)
  } catch {
    // Not saving only costs the choice on the next reload.
  }
}
