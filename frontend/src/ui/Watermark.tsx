import styled from "styled-components"

interface WatermarkProps {
  children?: React.ReactNode
}

const Watermark: React.FC<WatermarkProps> = (props) => {
  const { children } = props

  return <StyledWatermark>{children}</StyledWatermark>
}

const StyledWatermark = styled.h1`
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 5px;
  margin-left: 5px;
  opacity: 0.6;
`

export default Watermark
