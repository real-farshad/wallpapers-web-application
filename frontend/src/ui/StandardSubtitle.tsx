import styled from "styled-components"

interface StandardSubtitleProps {
  children?: React.ReactNode
  className?: string
}

const StandardSubtitle: React.FC<StandardSubtitleProps> = (props) => {
  const { children, className } = props

  return <StyledStandardSubtitle className={className}>{children}</StyledStandardSubtitle>
}

const StyledStandardSubtitle = styled.p`
  font-size: 10px;
  font-weight: 500;
  opacity: 0.6;
`

export default StandardSubtitle
