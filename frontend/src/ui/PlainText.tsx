import styled from "styled-components"

interface PlainTextProps {
  children?: React.ReactNode
}

const PlainText: React.FC<PlainTextProps> = (props) => {
  const { children } = props

  return <StyledPlainText>{children}</StyledPlainText>
}

const StyledPlainText = styled.p`
  font-size: 12px;
  font-weight: 400;
`

export default PlainText
