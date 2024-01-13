import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "white",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#222425",
        },
        {
          name: "black",
          value: "#000000",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
