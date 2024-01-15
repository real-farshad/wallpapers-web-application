import styled from "styled-components"

interface LinkProps {
  href: string
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = (props) => {
  const { href, children } = props

  return <StyledLink href={href}>{children}</StyledLink>
}

const StyledLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`

export default Link
