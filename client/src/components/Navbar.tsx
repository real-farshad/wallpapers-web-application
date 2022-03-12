import { useState } from "react";
import Navigation from "./Navigation";
import "../styles/Navbar.scss";

function Navbar({ children }: any) {
    const [menu, setMenu] = useState({
        isOpen: false,
        showAnimateElements: false,
    });

    function openMenu() {
        if (menu.isOpen) return;

        setMenu({ isOpen: true, showAnimateElements: false });
        setTimeout(
            () => setMenu({ isOpen: true, showAnimateElements: true }),
            0
        );
    }

    function closeMenu() {
        if (!menu.showAnimateElements) return;

        setMenu({ isOpen: true, showAnimateElements: false });
        setTimeout(
            () => setMenu({ isOpen: false, showAnimateElements: false }),
            500
        );
    }

    return (
        <nav className="navbar">
            <div>
                <div className="navbar__open-menu">
                    <button
                        className="navbar__open-menu-btn"
                        onClick={openMenu}
                    >
                        MENU
                    </button>
                </div>

                <div
                    className={`navbar__menu${
                        menu.isOpen ? " navbar__menu--show" : ""
                    }`}
                >
                    <div
                        className={`navbar__dark-menu-background${
                            menu.showAnimateElements
                                ? " navbar__dark-menu-background--animate-in"
                                : ""
                        }`}
                    />

                    <div className="navbar__close-menu">
                        <button
                            className={`navbar__close-menu-btn${
                                menu.showAnimateElements
                                    ? " navbar__close-menu-btn--animate-in"
                                    : ""
                            }`}
                            onClick={closeMenu}
                        >
                            CLOSE MENU
                        </button>
                    </div>

                    <div
                        className={`navbar__navigation${
                            menu.isOpen ? " navbar__navigation--show" : ""
                        }`}
                    >
                        <Navigation
                            showAnimateElements={menu.showAnimateElements}
                        />
                    </div>
                </div>
            </div>

            <div className="navbar__secondary-container">{children}</div>
        </nav>
    );
}

export default Navbar;
