import { useState } from "react";
import ContentWidthContainer from "../components/ContentWidthContainer";
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import authBg from "../assets/auth-bg.jpg";
import "../styles/Auth.scss";

interface AuthTypes {
    option?: string;
}

function Auth({ option }: AuthTypes) {
    const [authOption, setAuthOption] = useState(option);
    const [animationSteps, setAnimationSteps] = useState({
        showSignUp: authOption !== "sign-in",
        animateSignUp: authOption !== "sign-in",
        showSignIn: authOption === "sign-in",
        animateSignIn: authOption === "sign-in",
    });

    function handleClickOnSignUp() {
        if (authOption !== "sign-in") return;

        setAuthOption("sign-up");

        // animate sign-in out
        setAnimationSteps((prevState) => ({
            ...prevState,
            animateSignIn: false,
        }));
        setTimeout(
            () =>
                setAnimationSteps((prevState) => ({
                    ...prevState,
                    showSignIn: false,
                })),
            500
        );

        // animate sign-up in
        setTimeout(
            () =>
                setAnimationSteps((prevState) => ({
                    ...prevState,
                    showSignUp: true,
                })),
            500
        );
        setTimeout(() => {
            setAnimationSteps((prevState) => ({
                ...prevState,
                animateSignUp: true,
            }));
        }, 550);

        window.history.pushState("", "", "/auth/sign-up");
    }

    function handleClickOnSignIn() {
        if (authOption === "sign-in") return;

        setAuthOption("sign-in");

        // animate sign-up out
        setAnimationSteps((prevState) => ({
            ...prevState,
            animateSignUp: false,
        }));
        setTimeout(
            () =>
                setAnimationSteps((prevState) => ({
                    ...prevState,
                    showSignUp: false,
                })),
            500
        );

        // animate sign-in out
        setTimeout(
            () =>
                setAnimationSteps((prevState) => ({
                    ...prevState,
                    showSignIn: true,
                })),
            500
        );
        setTimeout(() => {
            setAnimationSteps((prevState) => ({
                ...prevState,
                animateSignIn: true,
            }));
        }, 550);

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
                        <Navbar>
                            <div className="auth__navigation">
                                <button
                                    className={`auth__navigation-btn${
                                        authOption !== "sign-in"
                                            ? " auth__navigation-btn--active"
                                            : ""
                                    }`}
                                    onClick={handleClickOnSignUp}
                                >
                                    SIGN UP
                                </button>

                                <span className="auth__separator">|</span>

                                <button
                                    className={`auth__navigation-btn${
                                        authOption === "sign-in"
                                            ? " auth__navigation-btn--active"
                                            : ""
                                    }`}
                                    onClick={handleClickOnSignIn}
                                >
                                    SIGN IN
                                </button>
                            </div>
                        </Navbar>
                    </header>

                    <main>
                        {animationSteps.showSignUp && (
                            <div
                                className={`auth__sign-up-container${
                                    animationSteps.animateSignUp
                                        ? " auth__sign-up-container--animate-in"
                                        : ""
                                }`}
                            >
                                <div className="auth__sign-up">
                                    <SignUp />
                                </div>
                            </div>
                        )}

                        {animationSteps.showSignIn && (
                            <div
                                className={`auth__sign-in-container${
                                    animationSteps.animateSignIn
                                        ? " auth__sign-in-container--animate-in"
                                        : ""
                                }`}
                            >
                                <div className="auth__sign-in">
                                    <SignIn />
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </ContentWidthContainer>
        </div>
    );
}

export default Auth;
