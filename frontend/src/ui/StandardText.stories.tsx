import type { Meta, StoryObj } from "@storybook/react"
import StandardText from "./StandardText"
import styled from "styled-components"

const meta = {
  title: "UI/StandardText",
  component: StandardText,
} satisfies Meta<typeof StandardText>

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
