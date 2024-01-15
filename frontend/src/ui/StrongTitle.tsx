import styled from "styled-components"

interface StrongTitleProps {
  children: React.ReactNode
}

const StrongTitle: React.FC<StrongTitleProps> = (props) => {
  const { children } = props

  return <StyledStrongTitle>{children}</StyledStrongTitle>
}

const StyledStrongTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  opacity: 0.87;
`

export default StrongTitle
