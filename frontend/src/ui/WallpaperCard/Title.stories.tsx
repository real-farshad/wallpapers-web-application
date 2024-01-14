import type { Meta, StoryObj } from "@storybook/react"
import Title from "./Title"

const meta = {
  title: "Wallpaper Card/Title",
  component: Title,
} satisfies Meta<typeof Title>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "Pellentesque Ligula Magna",
  },
}

export default meta
