import SearchField from "./SearchField";
import NavLink from "./NavLink";
import "../styles/Navigation.scss";

interface NavigationTypes {
    showAnimateElements: boolean;
}

function Navigation({ showAnimateElements }: NavigationTypes) {
    return (
        <ul className="navigation">
            <li className="navigation__element-container navigation__element-container--search-field">
                <div
                    className={`navigation__element${
                        showAnimateElements ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <SearchField />
                </div>
            </li>

            <li className="navigation__element-container">
                <div
                    className={`navigation__element${
                        showAnimateElements ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <NavLink to="/">HOME</NavLink>
                </div>
            </li>

            <li className="navigation__element-container">
                <div
                    className={`navigation__element${
                        showAnimateElements ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <NavLink to="/popular">POPULAR</NavLink>
                </div>
            </li>

            <li className="navigation__element-container">
                <div
                    className={`navigation__element${
                        showAnimateElements ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <NavLink to="/new">NEW</NavLink>
                </div>
            </li>

            <li className="navigation__element-container">
                <div
                    className={`navigation__element${
                        showAnimateElements ? " navigation__element--animate-in" : ""
                    }`}
                >
                    <NavLink to="/collections">COLLECTIONS</NavLink>
                </div>
            </li>
        </ul>
    );
}

export default Navigation;
