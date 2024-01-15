import type { Meta, StoryObj } from "@storybook/react"
import CollectionCard from "./CollectionCard"
import styled from "styled-components"
import wallpaperSample from "./assets/wallpaper.jpg"

const meta = {
  title: "UI/CollectionCard",
  component: CollectionCard,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof CollectionCard>

const Container = styled.div`
  width: 390px;
`

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: "65a27f999702bbfcfcc783c4",
    publisher: "Claire",
    publishDate: 1638045000000,
    wallpaperImage: wallpaperSample,
    title: "Tincidunt Erat Vitae Interdum",
    wallpaperCount: 10,
  },
}

export default meta
