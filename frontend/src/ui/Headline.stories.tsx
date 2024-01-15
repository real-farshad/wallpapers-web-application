import type { Meta, StoryObj } from "@storybook/react"
import Headline from "./Headline"

const meta = {
  title: "UI/Headline",
  component: Headline,
} satisfies Meta<typeof Headline>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        MOST <br />
        POPULAR <br />
        WALLPAPERS
      </>
    ),
  },
}

export default meta
