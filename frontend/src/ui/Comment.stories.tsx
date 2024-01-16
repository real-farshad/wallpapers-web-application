import type { Meta, StoryObj } from "@storybook/react"
import Comment from "./Comment"
import styled from "styled-components"
import avatarSample from "./assets/avatar.jpg"

const meta = {
  title: "UI/Comment",
  component: Comment,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Comment>

const Container = styled.div`
  width: 460px;
`

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    avatar: avatarSample,
    publisher: "Ellie",
    dateInMS: 1704629912949,
    description:
      "Nam consequat consequat lacus nec rutrum. Vivamus bibendum consequat nibh, id bibendum nulla rutrum quis. Vivamus mattis vitae ligula eget scelerisque.",
  },
}

export default meta
