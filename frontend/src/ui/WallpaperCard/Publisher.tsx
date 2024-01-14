import styled from "styled-components"

interface PublisherProps {
  text: string
  href: string
}

const Publisher: React.FC<PublisherProps> = (props) => {
  const { text, href } = props

  return (
    <StyledPublisher>
      By <a href={href}>@{text}</a>
    </StyledPublisher>
  )
}

const StyledPublisher = styled.p`
  font-size: 12px;
  font-weight: 500;
  opacity: 0.87;
`

export default Publisher
