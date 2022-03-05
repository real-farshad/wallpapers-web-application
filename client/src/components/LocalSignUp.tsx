import { useState } from "react";
import FormUsernameInput from "./FormUsernameInput";
import FormEmailInput from "./FormEmailInput";
import FormPasswordInput from "./FormPasswordInput";
import FormSubmitBtn from "./FormSubmitBtn";
import "../styles/LocalSignUp.scss";

function LocalSignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const user = { username, email, password };
        await fetch("/api/auth/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
    }

    return (
        <div className="local-sign-up">
            <h1 className="local-sign-up__title">
                Sign Up <br className="local-sign-up__md-title-break" />
                With Your <br className="local-sign-up__sm-title-break" />
                Email
            </h1>

            <form className="local-sign-up__form" onSubmit={handleFormSubmit}>
                <FormUsernameInput value={username} changeValue={setUsername} />
                <FormEmailInput value={email} changeValue={setEmail} />
                <FormPasswordInput value={password} changeValue={setPassword} />
                <FormSubmitBtn value="Create A New Account" />
            </form>
        </div>
    );
}

export default LocalSignUp;
