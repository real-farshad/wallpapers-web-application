import { useState, useEffect } from "react"
import type { Decorator, Meta, StoryObj } from "@storybook/react"
import WallpaperCard from "./WallpaperCard"
import styled from "styled-components"
import wallpaperSample from "./assets/wallpaper.jpg"

const meta = {
  title: "UI/WallpaperCard",
  component: WallpaperCard,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof WallpaperCard>

const Container = styled.div`
  width: 390px;
`

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: "65a27f999702bbfcfcc78397",
    publisher: "Charlotte",
    publishDate: 1633811400000,
    wallpaperImage: wallpaperSample,
    title: "Pellentesque Ligula Magna",
    likeCount: 5839,
  },
}

export const Loading: Story = {
  args: {
    id: "65a27f999702bbfcfcc78397",
    publisher: "Charlotte",
    publishDate: 1633811400000,
    wallpaperImage: wallpaperSample,
    title: "Pellentesque Ligula Magna",
    likeCount: 5839,
    loading: true,
  },
}

export const WithWatermark: any = ({ args }: any) => {
  const [watermark, setWatermark] = useState<undefined | string>("UNSAVED")

  useEffect(() => {
    const timer = setTimeout(() => {
      setWatermark(undefined)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  args.watermark = watermark

  return <WallpaperCard {...args} />
}

WithWatermark.args = {
  args: {
    id: "65a27f999702bbfcfcc78397",
    publisher: "Charlotte",
    publishDate: 1633811400000,
    wallpaperImage: wallpaperSample,
    title: "Pellentesque Ligula Magna",
    likeCount: 5839,
  },
}

export default meta
