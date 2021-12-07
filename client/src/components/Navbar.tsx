import { useState } from "react";
import { Link } from "react-router-dom";
import SearchField from "./SearchField";
import AuthBtns from "./AuthBtns";
import "../styles/Navbar.scss";

function Navbar() {
    const [menu, setMenu] = useState({
        isOpen: false,
        animateOverlay: false,
        animateCloseMenuBtn: false,
        animateNavLinks: {
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
        for (let navLink in menu.animateNavLinks) {
            animate(["animateNavLinks", navLink], true, delay);
            delay += 50;
        }
    }

    function closeMenu() {
        if (!menu.animateNavLinks.home) return;

        let delay = 0;
        for (let navLink of Object.keys(menu.animateNavLinks).reverse()) {
            animate(["animateNavLinks", navLink], false, delay);
            delay += 50;
        }

        animate(["animateCloseMenuBtn"], false, 100);
        animate(["animateOverlay"], false, 300);
        animate(["isOpen"], false, 800);
    }

    function animate(target: string[], value: boolean, delay: number): void {
        setTimeout(() => {
            // update state without mutating it
            if (target[0] === "animateNavLinks") {
                setMenu((prevState) => ({
                    ...prevState,
                    animateNavLinks: {
                        ...prevState.animateNavLinks,
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
                    className={`navbar__nav-link navbar__nav-link--search-field${
                        menu.animateNavLinks.home ? " navbar__nav-link--animate-in" : ""
                    }`}
                >
                    <div className="navbar__search-field">
                        <SearchField />
                    </div>
                </li>

                <li
                    className={`navbar__nav-link${
                        menu.animateNavLinks.home ? " navbar__nav-link--animate-in" : ""
                    }`}
                >
                    <Link to="/">HOME</Link>
                </li>

                <li
                    className={`navbar__nav-link${
                        menu.animateNavLinks.popular
                            ? " navbar__nav-link--animate-in"
                            : ""
                    }`}
                >
                    <Link to="/">POPULAR</Link>
                </li>

                <li
                    className={`navbar__nav-link${
                        menu.animateNavLinks.new ? " navbar__nav-link--animate-in" : ""
                    }`}
                >
                    <Link to="/">NEW</Link>
                </li>

                <li
                    className={`navbar__nav-link${
                        menu.animateNavLinks.collections
                            ? " navbar__nav-link--animate-in"
                            : ""
                    }`}
                >
                    <Link to="/">COLLECTIONS</Link>
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
