import styled from "styled-components"

interface SegmentTitleProps {
  children?: React.ReactNode
}

const SegmentTitle: React.FC<SegmentTitleProps> = (props) => {
  const { children } = props

  return <StyledSegmentTitle>{children}</StyledSegmentTitle>
}

const StyledSegmentTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  opacity: 0.87;
`

export default SegmentTitle
