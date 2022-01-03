import { Link } from "react-router-dom";
import "../styles/AuthNavigation.scss";

function AuthNavigation() {
    return (
        <div className="auth-navigation">
            <div className="auth-navigation__link">
                <Link to="/auth/sign-up">SIGN UP</Link>
            </div>

            <span className="auth-navigation__separator">|</span>

            <div className="auth-navigation__link">
                <Link to="/auth/sign-in">SIGN IN</Link>
            </div>
        </div>
    );
}

export default AuthNavigation;
