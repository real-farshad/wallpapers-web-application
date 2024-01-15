import type { Meta, StoryObj } from "@storybook/react"
import Watermark from "./Watermark"

const meta = {
  title: "UI/Watermark",
  component: Watermark,
} satisfies Meta<typeof Watermark>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "SAVED",
  },
}

export default meta
