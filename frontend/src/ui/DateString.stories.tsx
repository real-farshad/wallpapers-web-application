import type { Meta, StoryObj } from "@storybook/react"
import DateString from "./DateString"

const meta = {
  title: "UI/DateString",
  component: DateString,
} satisfies Meta<typeof DateString>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    dateInMS: 1633811400000,
  },
}

export default meta
