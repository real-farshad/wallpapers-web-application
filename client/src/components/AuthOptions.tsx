import { useState, useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "../styles/AuthOptions.scss";

interface AuthOptionsTypes {
    activeOption: string;
}

function AuthOptions({ activeOption }: AuthOptionsTypes) {
    const [animationSteps, setAnimationSteps] = useState({
        showSignUp: activeOption !== "sign-in",
        animateSignUp: activeOption !== "sign-in",
        showSignIn: activeOption === "sign-in",
        animateSignIn: activeOption === "sign-in",
    });

    useEffect(() => {
        if (activeOption !== "sign-in") animateSignUpOptionIn();
        if (activeOption === "sign-in") animateSignInOptionIn();
    }, [activeOption]);

    function animateSignUpOptionIn() {
        updateAnimationSteps("animateSignIn", false);
        setTimeout(() => updateAnimationSteps("showSignIn", false), 500);

        setTimeout(() => updateAnimationSteps("showSignUp", true), 500);
        setTimeout(() => updateAnimationSteps("animateSignUp", true), 550);
    }

    function animateSignInOptionIn() {
        updateAnimationSteps("animateSignUp", false);
        setTimeout(() => updateAnimationSteps("showSignUp", false), 500);

        setTimeout(() => updateAnimationSteps("showSignIn", true), 500);
        setTimeout(() => updateAnimationSteps("animateSignIn", true), 550);
    }

    function updateAnimationSteps(key: string, value: boolean): void {
        setAnimationSteps((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }

    return (
        <div className="auth-options">
            {animationSteps.showSignUp && (
                <div
                    className={`auth-options__container auth-options__container--sign-up${
                        animationSteps.animateSignUp
                            ? " auth-options__container--animate-in"
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
                    className={`auth-options__container auth-options__container--sign-in${
                        animationSteps.animateSignIn
                            ? " auth-options__container--animate-in"
                            : ""
                    }`}
                >
                    <div className="auth-options__sign-in">
                        <SignIn />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AuthOptions;
