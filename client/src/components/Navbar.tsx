import { useState } from "react";
import SearchField from "./SearchField";
import AuthBtns from "./AuthBtns";
import NavLink from "./NavLink";
import "../styles/Navbar.scss";

function Navbar() {
    const [menu, setMenu] = useState({
        isOpen: false,
        animateOverlay: false,
        animateCloseMenuBtn: false,
        animateNavItems: {
            home: false,
            popular: false,
            new: false,
            collections: false,
        },
    });

    function openMenu() {
        if (menu.isOpen) return;

        setMenu((prevState) => ({ ...prevState, isOpen: true }));
        animate(["animateOverlay"], true, 0);
        animate(["animateCloseMenuBtn"], true, 150);

        let delay = 150;
        for (let navLink in menu.animateNavItems) {
            animate(["animateNavItems", navLink], true, delay);
            delay += 50;
        }
    }

    function closeMenu() {
        if (!menu.animateNavItems.home) return;

        let delay = 0;
        for (let navLink of Object.keys(menu.animateNavItems).reverse()) {
            animate(["animateNavItems", navLink], false, delay);
            delay += 50;
        }

        animate(["animateCloseMenuBtn"], false, 100);
        animate(["animateOverlay"], false, 300);
        animate(["isOpen"], false, 800);
    }

    function animate(target: string[], value: boolean, delay: number): void {
        setTimeout(() => {
            // update state without mutating it
            if (target[0] === "animateNavItems") {
                setMenu((prevState) => ({
                    ...prevState,
                    animateNavItems: {
                        ...prevState.animateNavItems,
                        [target[1]]: value,
                    },
                }));
            } else {
                setMenu((prevState) => ({
                    ...prevState,
                    [target[0]]: value,
                }));
            }
        }, delay);
    }

    return (
        <nav className="navbar">
            <div className="navbar__menu-btn" onClick={openMenu}>
                MENU
            </div>

            <div
                className={`navbar__menu-layout${
                    menu.isOpen ? " navbar__menu-layout--show" : ""
                }`}
            >
                <div
                    className={`navbar__menu-overlay${
                        menu.animateOverlay ? " navbar__menu-overlay--animate-in" : ""
                    }`}
                />
                <div
                    className={`navbar__close-menu-btn${
                        menu.animateCloseMenuBtn
                            ? " navbar__close-menu-btn--animate-in"
                            : ""
                    }`}
                    onClick={closeMenu}
                >
                    CLOSE MENU
                </div>
            </div>

            <ul
                className={`navbar__navigation${
                    menu.isOpen ? " navbar__navigation--show" : ""
                }`}
            >
                <li
                    className={`navbar__nav-item navbar__nav-item--search-field${
                        menu.animateNavItems.home ? " navbar__nav-item--animate-in" : ""
                    }`}
                >
                    <div className="navbar__search-field">
                        <SearchField />
                    </div>
                </li>

                <li
                    className={`navbar__nav-item${
                        menu.animateNavItems.home ? " navbar__nav-item--animate-in" : ""
                    }`}
                >
                    <NavLink to="/">HOME</NavLink>
                </li>

                <li
                    className={`navbar__nav-item${
                        menu.animateNavItems.popular
                            ? " navbar__nav-item--animate-in"
                            : ""
                    }`}
                >
                    <NavLink to="/popular">POPULAR</NavLink>
                </li>

                <li
                    className={`navbar__nav-item${
                        menu.animateNavItems.new ? " navbar__nav-item--animate-in" : ""
                    }`}
                >
                    <NavLink to="/new">NEW</NavLink>
                </li>

                <li
                    className={`navbar__nav-item${
                        menu.animateNavItems.collections
                            ? " navbar__nav-item--animate-in"
                            : ""
                    }`}
                >
                    <NavLink to="/collections">COLLECTIONS</NavLink>
                </li>
            </ul>

            {true && (
                <div className="navbar__auth-btns">
                    <AuthBtns />
                </div>
            )}
        </nav>
    );
}

export default Navbar;
