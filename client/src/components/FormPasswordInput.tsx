import { useState } from "react";
import FormInput from "./FormInput";
import "../styles/FormPasswordInput.scss";

interface FormPasswordInputTypes {
    autoFocus?: boolean;
    password: string;
    setPassword: (v: string) => any;
    passwordError: null | string;
    setPasswordError: (v: null | string) => any;
}

function FormPasswordInput(props: FormPasswordInputTypes) {
    const {
        autoFocus,
        password,
        setPassword,
        passwordError,
        setPasswordError,
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    function handlePasswordChange(passwordInput: string) {
        const isValidPassword = validatePassword(passwordInput);

        if (!isValidPassword) {
            const errorMessage = `password must be between 8 and 32 characters long, and should include lowercase and uppercase letters, numbers and special characters in it.`;
            setPasswordError(errorMessage);
        } else setPasswordError(null);

        setPassword(passwordInput);
    }

    function validatePassword(passwordInput: string) {
        const minLength = 8;
        const maxLength = 32;
        const pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/;

        const passwordLength = passwordInput.length;
        const hasValidLength =
            passwordLength > minLength && passwordLength <= maxLength;
        const hasValidPattern = pattern.test(passwordInput);

        const isValidPassword = hasValidLength && hasValidPattern;
        if (passwordLength === 0 || isValidPassword) return true;
        return false;
    }

    function handleClickOnShowPassword() {
        setShowPassword((prevState) => !prevState);
    }

    return (
        <div className="form-password-input">
            <FormInput
                type={showPassword ? "text" : "password"}
                placeHolder="Password*"
                autoFocus={autoFocus}
                value={password}
                changeValue={handlePasswordChange}
                hasInvalidInput={passwordError ? true : false}
            />

            <button
                type="button"
                className={`form-password-input__show-btn${
                    showPassword ? " form-password-input__show-btn--active" : ""
                }`}
                onClick={handleClickOnShowPassword}
            >
                SHOW
            </button>
        </div>
    );
}

export default FormPasswordInput;
