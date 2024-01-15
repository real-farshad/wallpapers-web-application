import type { Meta, StoryObj } from "@storybook/react"
import Avatar from "./Avatar"
import styled from "styled-components"
import avatarSample from "./assets/avatar.jpg"

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Avatar>

const Container = styled.div`
  width: 50px;
  height: 50px;
`

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: avatarSample,
  },
}

export default meta
