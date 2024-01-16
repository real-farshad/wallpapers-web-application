import styled from "styled-components"

interface HeadlineProps {
  children?: React.ReactNode
}

const Headline: React.FC<HeadlineProps> = (props) => {
  const { children } = props

  return <StyledHeadline>{children}</StyledHeadline>
}

const StyledHeadline = styled.h1`
  line-height: 1;
  font-size: 44px;
  font-weight: 900;
  margin-bottom: -5px;
  opacity: 0.87;
`

export default Headline
