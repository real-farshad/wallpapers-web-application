import styled from "styled-components"

interface DisplayTitleProps {
  text: string
}

const DisplayTitle: React.FC<DisplayTitleProps> = ({ text }) => {
  return <StyledDisplayTitle>{text}</StyledDisplayTitle>
}

const StyledDisplayTitle = styled.h1`
  line-height: 1;
  font-size: 44px;
  font-weight: 900;
  margin-bottom: -5px;
  opacity: 0.87;
`

export default DisplayTitle
