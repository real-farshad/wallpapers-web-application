import type { Meta, StoryObj } from "@storybook/react"
import PublishDate from "./PublishDate"

const meta = {
  title: "Wallpaper Card/PublishDate",
  component: PublishDate,
} satisfies Meta<typeof PublishDate>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    dateInMS: 1633811400000,
  },
}

export default meta
