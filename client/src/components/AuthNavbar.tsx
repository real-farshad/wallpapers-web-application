import Navbar from "./Navbar";
import "../styles/AuthNavbar.scss";

interface AuthNavbarTypes {
    activeOption: string;
    handleClickOnSignUp: () => void;
    handleClickOnSignIn: () => void;
}

function AuthNavbar(props: AuthNavbarTypes) {
    const { activeOption, handleClickOnSignUp, handleClickOnSignIn } = props;

    return (
        <Navbar>
            <div className="auth-navbar__navigation">
                <button
                    className={`auth-navbar__navigation-btn${
                        activeOption !== "sign-in"
                            ? " auth-navbar__navigation-btn--active"
                            : ""
                    }`}
                    onClick={handleClickOnSignUp}
                >
                    SIGN UP
                </button>

                <span className="auth-navbar__separator">|</span>

                <button
                    className={`auth-navbar__navigation-btn${
                        activeOption === "sign-in"
                            ? " auth-navbar__navigation-btn--active"
                            : ""
                    }`}
                    onClick={handleClickOnSignIn}
                >
                    SIGN IN
                </button>
            </div>
        </Navbar>
    );
}

export default AuthNavbar;
