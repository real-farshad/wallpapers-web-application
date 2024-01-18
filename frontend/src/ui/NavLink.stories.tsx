import type { Meta, StoryObj } from "@storybook/react"
import NavLink from "./NavLink"

const meta = {
  title: "UI/NavLink",
  component: NavLink,
} satisfies Meta<typeof NavLink>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: "/#",
    children: "Home",
  },
}

export const AlwaysActive: Story = {
  args: {
    href: "/#",
    alwaysActive: true,
    children: "Home",
  },
}

export default meta
