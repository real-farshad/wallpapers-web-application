import { useState } from "react";
import createUser from "../api/createUser";
import FormUsernameInput from "./FormUsernameInput";
import FormEmailInput from "./FormEmailInput";
import FormPasswordInput from "./FormPasswordInput";
import FormSubmitBtn from "./FormSubmitBtn";
import FormError from "./FormError";
import "../styles/LocalSignUp.scss";

function LocalSignUp() {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(null as null | string);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null as null | string);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null as null | string);

    const [errorMessages, setErrorMessages] = useState(null as null | string[]);

    async function handleFormSubmit(e: any) {
        e.preventDefault();
        setErrorMessages(null);

        const hasEmptyInputs =
            username === "" || email === "" || password === "";
        if (hasEmptyInputs) {
            return setErrorMessages(["please first fill out the form!"]);
        }

        const errors = [];
        if (usernameError) errors.push(usernameError);
        if (emailError) errors.push(emailError);
        if (passwordError) errors.push(passwordError);

        if (errors.length !== 0) return setErrorMessages(errors);

        const user = { username, email, password };
        const result = await createUser(user);

        if (result.success) return (window.location.href = "/auth/sign-in");
        else if (result.error) return setErrorMessages([result.error]);
        else setErrorMessages(["unable to make the request!"]);
    }

    return (
        <div className="local-sign-up">
            <h1 className="local-sign-up__title">
                Sign Up <br className="local-sign-up__md-title-break" />
                With Your <br className="local-sign-up__sm-title-break" />
                Email
            </h1>

            <form className="local-sign-up__form" onSubmit={handleFormSubmit}>
                <FormUsernameInput
                    username={username}
                    setUsername={setUsername}
                    usernameError={usernameError}
                    setUsernameError={setUsernameError}
                />

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

                <FormSubmitBtn value="Create A New Account" />
            </form>

            {errorMessages && (
                <div className="local-sign-up__error">
                    <FormError
                        errorMessages={errorMessages}
                        setErrorMessages={setErrorMessages}
                    />
                </div>
            )}
        </div>
    );
}

export default LocalSignUp;
