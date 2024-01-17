import { useEffect, useState } from "react"
import styled from "styled-components"
import type { Meta, StoryObj } from "@storybook/react"
import LoadingScreen from "./LoadingScreen"
import loadingSample from "./assets/loading.jpg"

const meta = {
  title: "UI/LoadingScreen",
  component: LoadingScreen,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof LoadingScreen>

const Container = styled.div`
  position: relative;
  width: 1500px;
  height: 800px;
  overflow: hidden;
`

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    image: loadingSample,
  },
}

export const WithFadeIn: Story = {
  args: {
    image: loadingSample,
    fadeIn: true,
  },
}

export const WithFadeOut: any = (args: any) => {
  const [finishLoading, setFinishLoading] = useState<boolean>(false)
  const [fadeOutLoadingScreen, setFadeOutLoadingScreen] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinishLoading(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!finishLoading) return

    const timer = setTimeout(() => {
      setFadeOutLoadingScreen(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [finishLoading])

  args.finishLoading = finishLoading
  args.fadeOut = fadeOutLoadingScreen

  return <LoadingScreen {...args} />
}

WithFadeOut.args = {
  image: loadingSample,
}

export default meta
