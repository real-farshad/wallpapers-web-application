import type { Meta, StoryObj } from "@storybook/react"
import StrongTitle from "./StrongTitle"

const meta = {
  title: "UI/StrongTitle",
  component: StrongTitle,
} satisfies Meta<typeof StrongTitle>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Pellentesque Ligula Magna",
  },
}

export default meta
