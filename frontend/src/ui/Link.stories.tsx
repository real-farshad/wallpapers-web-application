import type { Meta, StoryObj } from "@storybook/react"
import Link from "./Link"

const meta = {
  title: "UI/Link",
  component: Link,
} satisfies Meta<typeof Link>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: "/#",
    children: "@Charlotte",
  },
}

export default meta
