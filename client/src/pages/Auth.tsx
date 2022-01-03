import { useState } from "react";
import ContentWidthContainer from "../components/ContentWidthContainer";
import AuthNavbar from "../components/AuthNavbar";
import AuthOptions from "../components/AuthOptions";
import authBg from "../assets/auth-bg.jpg";
import "../styles/Auth.scss";

interface AuthTypes {
    option?: string;
}

function Auth({ option }: AuthTypes) {
    const [authOption, setAuthOption] = useState(option);

    function activateSignUp() {
        if (authOption !== "sign-in") return;

        setAuthOption("sign-up");
        window.history.pushState("", "", "/auth/sign-up");
    }

    function activateSignIn() {
        if (authOption === "sign-in") return;

        setAuthOption("sign-in");
        window.history.pushState("", "", "/auth/sign-in");
    }

    return (
        <div className="auth">
            <div className="auth__background">
                <div
                    className={`auth__background-image${
                        authOption === "sign-in"
                            ? " auth__background-image--right-position"
                            : ""
                    }`}
                    style={{ backgroundImage: `url(${authBg})` }}
                />

                <div className="auth__background-overlay" />
            </div>

            <ContentWidthContainer>
                <div className="auth__container">
                    <header>
                        <AuthNavbar
                            activeOption={authOption as string}
                            handleClickOnSignUp={activateSignUp}
                            handleClickOnSignIn={activateSignIn}
                        />
                    </header>

                    <main>
                        <AuthOptions activeOption={authOption as string} />
                    </main>
                </div>
            </ContentWidthContainer>
        </div>
    );
}

export default Auth;
