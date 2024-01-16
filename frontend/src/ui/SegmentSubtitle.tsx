import styled from "styled-components"

interface SegmentSubtitleProps {
  children?: React.ReactNode
}

const SegmentSubtitle: React.FC<SegmentSubtitleProps> = (props) => {
  const { children } = props

  return <StyledSegmentSubtitle>{children}</StyledSegmentSubtitle>
}

const StyledSegmentSubtitle = styled.h1`
  font-size: 12px;
  font-weight: 500;
  opacity: 0.4;
`

export default SegmentSubtitle
