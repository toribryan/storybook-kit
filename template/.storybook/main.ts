import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: "@storybook/react-vite",
  staticDirs: ["../public"],
  core: {
    disableWhatsNewNotifications: true,
  },
  // Storybook's own onboarding is aimed at engineers learning Storybook, and
  // its checklist sits at the top of the sidebar, above the design system.
  features: {
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
  },
}

export default config
