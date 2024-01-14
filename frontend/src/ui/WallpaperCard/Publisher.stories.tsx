import type { Meta, StoryObj } from "@storybook/react"
import Publisher from "./Publisher"

const meta = {
  title: "Wallpaper Card/Publisher",
  component: Publisher,
} satisfies Meta<typeof Publisher>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "Charlotte",
    href: "/#",
  },
}

export default meta
