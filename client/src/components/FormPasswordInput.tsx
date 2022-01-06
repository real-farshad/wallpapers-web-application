import { useState } from "react";
import FormInput from "./FormInput";
import "../styles/FormPasswordInput.scss";

interface FormPasswordInputTypes {
    autoFocus?: boolean;
    value: string;
    changeValue: (newValue: string) => void;
}

function FormPasswordInput(props: FormPasswordInputTypes) {
    const { autoFocus, value, changeValue } = props;

    const [showPassword, setShowPassword] = useState(false);

    function handleClickOnShowPassword() {
        setShowPassword((prevState) => !prevState);
    }

    return (
        <div className="form-password-input">
            <FormInput
                type={showPassword ? "text" : "password"}
                placeHolder="Password*"
                autoFocus={autoFocus}
                value={value}
                changeValue={changeValue}
            />

            <button
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
