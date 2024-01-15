import type { Meta, StoryObj } from "@storybook/react"
import MutedText from "./MutedText"
import styled from "styled-components"

const meta = {
  title: "UI/MutedText",
  component: MutedText,
} satisfies Meta<typeof MutedText>

type Story = StoryObj<typeof meta>
const Container = styled.div`
  max-width: 400px;
`

export const Default: Story = {
  args: {
    children: (
      <Container>
        Duis vitae nunc consectetur, ornare ex nec, placerat nisl. Ut maximus aliquet turpis, ac
        fermentum.
      </Container>
    ),
  },
}

export default meta
