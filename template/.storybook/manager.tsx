import React, { useEffect, useState } from "react"
import {
  BookmarkIcon,
  BoxesIcon,
  ComponentIcon,
  FileTextIcon,
  FolderIcon,
  HouseIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
  SwatchBookIcon,
  type LucideIcon,
} from "lucide-react"
import { IconButton } from "storybook/internal/components"
import { addons, types, type API } from "storybook/manager-api"

import { brand } from "../brand.config"
import { chromeVariables, darkTheme, lightTheme, loadFonts } from "./theme"
import {
  readTheme,
  saveTheme,
  THEME_EVENT,
  THEME_REQUEST,
  type Theme,
} from "./theme-sync"

// A `new`, `beta` or `deprecated` tag on a component's meta renders as a
// pill beside its name. Tags rather than title suffixes, so adding or
// dropping one never changes a docs URL.
const STATUSES = ["new", "beta", "deprecated"]

// Lucide icons stand in for Storybook's own sidebar icons, which are hidden
// in manager-head.html. Named pages and sections get their own icon; every
// other entry gets one for its type.
const ICON_BY_ID: Record<string, LucideIcon> = {
  "welcome--docs": HouseIcon,
  foundations: PaletteIcon,
  components: BoxesIcon,
}

// Foundations pages document tokens rather than components.
const ICON_BY_PARENT: Record<string, LucideIcon> = {
  foundations: SwatchBookIcon,
}

const ICON_BY_TYPE: Record<string, LucideIcon> = {
  root: FolderIcon,
  group: FolderIcon,
  component: ComponentIcon,
  docs: FileTextIcon,
  story: BookmarkIcon,
}

loadFonts()
chromeVariables()
document.title = brand.name

const initialTheme = readTheme()
document.documentElement.dataset.kitTheme = initialTheme

addons.setConfig({
  theme: initialTheme === "dark" ? darkTheme : lightTheme,
  showToolbar: true,
  sidebar: {
    showRoots: false,
    renderLabel: (item) => {
      const status =
        item.type === "component"
          ? STATUSES.find((tag) => item.tags.includes(tag))
          : undefined
      const Icon =
        ICON_BY_ID[item.id] ??
        (item.type === "component" && item.parent
          ? ICON_BY_PARENT[item.parent]
          : undefined) ??
        ICON_BY_TYPE[item.type]
      return (
        <span className="kit-label">
          {Icon ? (
            <Icon className="kit-icon" size={16} strokeWidth={1.75} />
          ) : null}
          {item.name}
          {status ? (
            <span className={`kit-status kit-status--${status}`}>{status}</span>
          ) : null}
        </span>
      )
    },
  },
})

function ThemeTool({ api }: { api: API }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  // The sidebar and toolbar switch with the docs, so the chrome never sits
  // dark around a light page.
  useEffect(() => {
    document.documentElement.dataset.kitTheme = theme
    api.setOptions({ theme: theme === "dark" ? darkTheme : lightTheme })
    saveTheme(theme)
    api.emit(THEME_EVENT, theme)
  }, [api, theme])

  // A preview that loads after the manager asks for the current theme.
  useEffect(() => {
    const reply = () => api.emit(THEME_EVENT, theme)
    api.on(THEME_REQUEST, reply)
    return () => api.off(THEME_REQUEST, reply)
  }, [api, theme])

  const next = theme === "dark" ? "light" : "dark"
  return (
    <IconButton
      title={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
    >
      {theme === "dark" ? <MoonIcon size={14} /> : <SunIcon size={14} />}
      {theme === "dark" ? "Dark" : "Light"}
    </IconButton>
  )
}

addons.register("kit/theme", (api) => {
  addons.add("kit/theme/tool", {
    type: types.TOOL,
    title: "Theme",
    render: () => <ThemeTool api={api} />,
  })
})
