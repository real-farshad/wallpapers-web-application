import { useState } from "react";
import signInUser from "../api/signInUser";
import FormEmailInput from "./FormEmailInput";
import FormPasswordInput from "./FormPasswordInput";
import FormSubmitBtn from "./FormSubmitBtn";
import FormError from "./FormError";
import "../styles/LocalSignIn.scss";

function LocalSignIn() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null as null | string);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null as null | string);

    const [errorMessages, setErrorMessages] = useState(null as null | string[]);

    async function handleFormSubmit(e: any) {
        e.preventDefault();
        setErrorMessages(null);

        const hasEmptyInputs = email === "" || password === "";
        if (hasEmptyInputs) {
            return setErrorMessages(["please first fill out the form!"]);
        }

        const errors = [];
        if (emailError) errors.push(emailError);
        if (passwordError) errors.push(passwordError);

        if (errors.length !== 0) return setErrorMessages(errors);

        const user = { email, password };
        const result = await signInUser(user);

        if (result.success) return (window.location.href = "/");
        else if (result.error) return setErrorMessages([result.error]);
        else setErrorMessages(["unable to make the request!"]);
    }

    return (
        <div className="local-sign-in">
            <form className="local-sign-in__form" onSubmit={handleFormSubmit}>
                <FormEmailInput
                    email={email}
                    setEmail={setEmail}
                    emailError={emailError}
                    setEmailError={setEmailError}
                />

                <FormPasswordInput
                    password={password}
                    setPassword={setPassword}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError}
                />

                <FormSubmitBtn value="Sign In" />
            </form>

            {errorMessages && (
                <div className="local-sign-in__error">
                    <FormError
                        errorMessages={errorMessages}
                        setErrorMessages={setErrorMessages}
                    />
                </div>
            )}
        </div>
    );
}

export default LocalSignIn;
