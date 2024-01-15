import type { Meta, StoryObj } from "@storybook/react"
import StandardTitle from "./StandardTitle"

const meta = {
  title: "UI/StandardTitle",
  component: StandardTitle,
} satisfies Meta<typeof StandardTitle>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        Pellentesque Ligula <br />
        Magna
      </>
    ),
  },
}

export default meta
