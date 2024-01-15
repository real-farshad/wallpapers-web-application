import type { Meta, StoryObj } from "@storybook/react"
import SegmentSubtitle from "./SegmentSubtitle"

const meta = {
  title: "UI/SegmentSubtitle",
  component: SegmentSubtitle,
} satisfies Meta<typeof SegmentSubtitle>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        Use More Features And Personalize <br />
        Your Experience
      </>
    ),
  },
}

export default meta
