import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import Loading from "./Loading"
import styled from "styled-components"

const meta = {
  title: "UI/Loading",
  component: Loading,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Loading>

const Container = styled.div`
  width: 500px;
`

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCompletion: any = ({ args = {} }: any) => {
  const [finished, setFinished] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinished(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  args.finished = finished

  return <Loading {...args} />
}

export default meta
