import { useState } from "react";
import FormEmailInput from "./FormEmailInput";
import FormPasswordInput from "./FormPasswordInput";
import FormSubmitBtn from "./FormSubmitBtn";
import "../styles/LocalSignIn.scss";

function LocalSignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const user = { email, password };
        await fetch("/api/auth/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
    }

    return (
        <div className="local-sign-in">
            <form className="local-sign-in__form" onSubmit={handleFormSubmit}>
                <FormEmailInput value={email} changeValue={setEmail} />

                <FormPasswordInput value={password} changeValue={setPassword} />

                <FormSubmitBtn value="Sign In" />
            </form>
        </div>
    );
}

export default LocalSignIn;
