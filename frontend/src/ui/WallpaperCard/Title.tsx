import styled from "styled-components"

interface TitleProps {
  text: string
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <StyledTitle>{text}</StyledTitle>
}

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  opacity: 0.87;
`

export default Title
