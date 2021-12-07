import { Link } from "react-router-dom";
import "../styles/AuthBtns.scss";

function AuthBtns() {
    return (
        <div className="auth-btns">
            <Link to="/auth/sign-in">SIGN IN</Link>
            <span className="auth-btns__separator">|</span>
            <Link to="auth/sign-up">SIGN UP</Link>
        </div>
    );
}

export default AuthBtns;
