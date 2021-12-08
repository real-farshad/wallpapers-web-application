import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import "../styles/NavLink.scss";

function NavLink({ children, to }: LinkProps) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link className={`nav-link${match ? " nav-link--active" : ""}`} to={to}>
            {children}
        </Link>
    );
}

export default NavLink;
