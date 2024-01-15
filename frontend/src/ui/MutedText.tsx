import styled from "styled-components"

interface MutedTextProps {
  children: React.ReactNode
}

const MutedText: React.FC<MutedTextProps> = (props) => {
  const { children } = props

  return <StyledMutedText>{children}</StyledMutedText>
}

const StyledMutedText = styled.p`
  font-size: 12px;
  font-weight: 500;
  opacity: 0.6;
`

export default MutedText
