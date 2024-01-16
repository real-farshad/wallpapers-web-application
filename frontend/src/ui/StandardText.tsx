import styled from "styled-components"

interface StandardTextProps {
  children?: React.ReactNode
}

const StandardText: React.FC<StandardTextProps> = (props) => {
  const { children } = props

  return <StyledStandardText>{children}</StyledStandardText>
}

const StyledStandardText = styled.p`
  font-size: 12px;
  font-weight: 500;
  opacity: 0.87;
`

export default StandardText
