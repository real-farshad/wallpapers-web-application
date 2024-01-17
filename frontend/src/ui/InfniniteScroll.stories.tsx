import type { Meta } from "@storybook/react"
import InfiniteScroll from "./InfiniteScroll"
import { useState } from "react"
import styled from "styled-components"

const meta = {
  title: "UI/InfiniteScroll",
  component: InfiniteScroll,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof InfiniteScroll>

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  width: 950px;
  margin: 100px;
`

const Item = styled.div`
  width: 300px;
  height: 450px;
  background-color: #ffffff;
  border-radius: 10px;
  opacity: 0.25;
`

export const Template = () => {
  const initialItems = Array.from({ length: 9 }, (_, index) => ({
    id: `item-${index}`,
    component: <Item />,
  }))

  const [items, setItems] = useState(initialItems)
  const [hasMoreItems, setHasMoreItems] = useState(true)

  const mockFetchMoreItems = () => {
    if (items.length >= 30) {
      setHasMoreItems(false)
      return
    }

    const newItems = Array.from({ length: 6 }, (_, index) => ({
      id: `new-item-${index + items.length}`,
      component: <Item />,
    }))

    setItems((prevItems) => [...prevItems, ...newItems])
  }

  return (
    <InfiniteScroll items={items} fetchMoreItems={mockFetchMoreItems} hasMoreItems={hasMoreItems} />
  )
}

export default meta
