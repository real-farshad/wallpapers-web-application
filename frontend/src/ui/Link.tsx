import styled from "styled-components"

interface LinkProps {
  href?: string
  children?: React.ReactNode
  className?: string
}

const Link: React.FC<LinkProps> = (props) => {
  const { href, children, className } = props

  return (
    <StyledLink href={href || "/#"} className={className}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`

export default Link
