import type { Meta, StoryObj } from "@storybook/react"
import MutedSubtitle from "./MutedSubtitle"

const meta = {
  title: "UI/MutedSubtitle",
  component: MutedSubtitle,
} satisfies Meta<typeof MutedSubtitle>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Published At 10 Oct 2021",
  },
}

export default meta
