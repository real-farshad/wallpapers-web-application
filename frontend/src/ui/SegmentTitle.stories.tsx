import type { Meta, StoryObj } from "@storybook/react"
import SegmentTitle from "./SegmentTitle"

const meta = {
  title: "UI/SegmentTitle",
  component: SegmentTitle,
} satisfies Meta<typeof SegmentTitle>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        Sign Up With <br />
        Your Google Account
      </>
    ),
  },
}

export default meta
