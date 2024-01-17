import React, { Fragment, ReactNode, useCallback, useRef } from "react"

interface Item {
  id: string
  component: ReactNode
}

interface InfiniteScrollProps {
  items: Item[]
  fetchMoreItems: () => void
  hasMoreItems: boolean
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = (props) => {
  const { items, fetchMoreItems, hasMoreItems } = props

  const observerRef = useRef<IntersectionObserver>()

  const lastCardRef = useCallback(
    (node: any) => {
      if (observerRef.current) observerRef.current.disconnect()
      if (!hasMoreItems) return

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchMoreItems()
          }
        },
        { threshold: 0.7 }
      )

      if (node) {
        observerRef.current.observe(node)
      }
    },
    [fetchMoreItems, hasMoreItems]
  )

  return (
    <Fragment>
      {items.map((item, index) => (
        <div key={item.id} ref={index === items.length - 1 ? lastCardRef : null}>
          {item.component}
        </div>
      ))}
    </Fragment>
  )
}

export default InfiniteScroll
