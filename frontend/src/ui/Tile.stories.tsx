import type { Meta, StoryObj } from "@storybook/react"
import Title from "./Title"

const meta = {
  title: "Example/Title",
  component: Title,
} satisfies Meta<typeof Title>

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: "Your Title Here",
  },
}

export default meta
