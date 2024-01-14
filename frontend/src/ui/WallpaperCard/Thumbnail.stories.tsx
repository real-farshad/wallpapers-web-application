import type { Meta, StoryObj } from "@storybook/react"
import Thumbnail from "./Thumbnail"
import styled from "styled-components"
import thumbnailSample from "../assets/thumbnail-sample.jpg"

const meta = {
  title: "Wallpaper Card/Thumbnail",
  component: Thumbnail,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Thumbnail>

const Container = styled.div`
  width: 382px;
  height: 220px;
`

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: thumbnailSample,
  },
}

export default meta
