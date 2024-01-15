import styled from "styled-components"

interface MutedSubtitleProps {
  children?: React.ReactNode
}

const MutedSubtitle: React.FC<MutedSubtitleProps> = (props) => {
  const { children } = props

  return <StyledMutedSubtitle>{children}</StyledMutedSubtitle>
}

const StyledMutedSubtitle = styled.p`
  font-size: 10px;
  font-weight: 500;
  opacity: 0.4;
`

export default MutedSubtitle
