import React from "react"
import type { Preview } from "@storybook/react"
import { ThemeProvider } from "styled-components"
import GlobalStyles from "../GlobalStyles"
import theme from "../theme"

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
    layout: "centered",
  },
}

export const decorators = [
  (Story) => (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    </>
  ),
]

export default preview
