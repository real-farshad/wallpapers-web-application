import type { Meta, StoryObj } from "@storybook/react"
import StandardSubtitle from "./StandardSubtitle"

const meta = {
  title: "UI/StandardSubtitle",
  component: StandardSubtitle,
} satisfies Meta<typeof StandardSubtitle>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Published At 10 Oct 2021",
  },
}

export default meta
