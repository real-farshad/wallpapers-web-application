import styled from "styled-components"

interface StandardTitleProps {
  children: React.ReactNode
}

const StandardTitle: React.FC<StandardTitleProps> = (props) => {
  const { children } = props

  return <StyledStandardTitle>{children}</StyledStandardTitle>
}

const StyledStandardTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  opacity: 0.87;
`

export default StandardTitle
