import { useState } from "react";
import Navigation from "./Navigation";
import AuthBtns from "./AuthBtns";
import "../styles/Navbar.scss";

function Navbar() {
    const [menu, setMenu] = useState({
        isOpen: false,
        animateOverlay: false,
        animateCloseMenuBtn: false,
        animateNavigation: false,
    });

    function openMenu() {
        if (menu.isOpen) return;

        setMenu((prevState) => ({ ...prevState, isOpen: true }));
        animate("animateOverlay", true, 0);
        animate("animateCloseMenuBtn", true, 150);
        animate("animateNavigation", true, 150);
    }

    function closeMenu() {
        if (!menu.animateNavigation) return;

        animate("animateNavigation", false, 150);
        animate("animateCloseMenuBtn", false, 100);
        animate("animateOverlay", false, 300);
        animate("isOpen", false, 800);
    }

    function animate(target: string, value: boolean, delay: number): void {
        setTimeout(() => {
            setMenu((prevState) => ({
                ...prevState,
                [target]: value,
            }));
        }, delay);
    }

    return (
        <nav className="navbar">
            <button className="navbar__menu-btn" onClick={openMenu}>
                MENU
            </button>

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

                <div className="navbar__close-menu">
                    <button
                        className={`navbar__close-menu-btn${
                            menu.animateCloseMenuBtn
                                ? " navbar__close-menu-btn--animate-in"
                                : ""
                        }`}
                        onClick={closeMenu}
                    >
                        CLOSE MENU
                    </button>
                </div>
            </div>

            <div
                className={`navbar__navigation${
                    menu.isOpen ? " navbar__navigation--show" : ""
                }`}
            >
                <Navigation animateIn={menu.animateNavigation} />
            </div>

            {true && (
                <div className="navbar__auth-btns">
                    <AuthBtns />
                </div>
            )}
        </nav>
    );
}

export default Navbar;
