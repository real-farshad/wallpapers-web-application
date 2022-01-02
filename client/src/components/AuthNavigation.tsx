import { Link } from "react-router-dom";
import "../styles/AuthNavigation.scss";

interface AuthNavigationTypes {
    signInActive: true;
    signUpActive: true;
}

function AuthNavigation(props: AuthNavigationTypes) {
    const { signInActive, signUpActive } = props;

    return (
        <div className="auth-navigation">
            <div
                className={`auth-navigation__link${
                    signInActive ? " auth-navigation__link--active" : ""
                }`}
            >
                <Link to="/auth/sign-in">SIGN IN</Link>
            </div>

            <span className="auth-navigation__separator">|</span>

            <div
                className={`auth-navigation__link${
                    signUpActive ? " auth-navigation__link--active" : ""
                }`}
            >
                <Link to="auth/sign-up">SIGN UP</Link>
            </div>
        </div>
    );
}

export default AuthNavigation;
