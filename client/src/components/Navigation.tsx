import SearchField from "./SearchField";
import NavLink from "./NavLink";
import "../styles/Navigation.scss";

interface NavigationTypes {
    animateIn: boolean;
}

function Navigation({ animateIn }: NavigationTypes) {
    return (
        <ul className="navigation">
            <li className="navigation__item navigation__item--search-field">
                <div
                    className={`navigation__element${
                        animateIn ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <SearchField />
                </div>
            </li>

            <li className="navigation__item">
                <div
                    className={`navigation__element${
                        animateIn ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <NavLink to="/">HOME</NavLink>
                </div>
            </li>

            <li className="navigation__item">
                <div
                    className={`navigation__element${
                        animateIn ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <NavLink to="/popular">POPULAR</NavLink>
                </div>
            </li>

            <li className="navigation__item">
                <div
                    className={`navigation__element${
                        animateIn ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <NavLink to="/new">NEW</NavLink>
                </div>
            </li>

            <li className="navigation__item">
                <div
                    className={`navigation__element${
                        animateIn ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <NavLink to="/collections">COLLECTIONS</NavLink>
                </div>
            </li>
        </ul>
    );
}

export default Navigation;
