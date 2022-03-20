import { useState } from "react";
import "../styles/FormInput.scss";

interface FormInputTypes {
    type: string;
    placeHolder: string;
    autoFocus?: boolean;
    value: string;
    changeValue: (newValue: string) => void;
    hasInvalidInput?: boolean;
}

function FormInput(props: FormInputTypes) {
    const { type, placeHolder, value, changeValue, hasInvalidInput } = props;
    const autoFocus = props.autoFocus ? true : false;

    const [showInvalidInput, setShowInvalidInput] = useState(false);

    function handleInputChange(e: any) {
        changeValue(e.target.value);
    }

    function handleFocus() {
        setShowInvalidInput(false);
    }

    function handleBlur() {
        if (hasInvalidInput) setShowInvalidInput(true);
    }

    return (
        <input
            className={`form-input${
                showInvalidInput ? " form-input--invalid-input" : ""
            }`}
            type={type}
            placeholder={placeHolder}
            autoFocus={autoFocus}
            autoComplete="off"
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );
}

export default FormInput;
