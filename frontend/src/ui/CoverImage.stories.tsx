import type { Meta, StoryObj } from "@storybook/react"
import CoverImage from "./CoverImage"
import styled from "styled-components"
import wallpaperSample from "./assets/wallpaper.jpg"

const meta = {
  title: "UI/CoverImage",
  component: CoverImage,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof CoverImage>

const Container = styled.div`
  width: 1920px;
  height: 700px;
`

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: wallpaperSample,
  },
}

export default meta
