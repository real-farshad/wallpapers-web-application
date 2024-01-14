import type { Meta, StoryObj } from "@storybook/react"
import DisplayTitle from "./DisplayTitle"

const meta = {
  title: "UI/DisplayTitle",
  component: DisplayTitle,
} satisfies Meta<typeof DisplayTitle>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "MOST POPULAR WALLPAPERS",
  },
}

export default meta
