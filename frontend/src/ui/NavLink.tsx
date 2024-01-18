import styled from "styled-components"
import Link from "./Link"

interface NavLinkProps {
  href?: string
  alwaysActive?: boolean
  children?: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = (props) => {
  const { href, alwaysActive, children } = props

  return (
    <StyledNavLink href={href || "/#"} alwaysActive={alwaysActive}>
      {children}
    </StyledNavLink>
  )
}

const StyledNavLink = styled(Link)<{ alwaysActive?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  opacity: ${({ alwaysActive }) => (alwaysActive ? "0.87" : "0.4")};
  transition: 0.3s;

  &:hover {
    opacity: 0.87;
  }
`

export default NavLink
