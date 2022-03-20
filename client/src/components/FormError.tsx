import { useEffect, useState } from "react";
import "../styles/FormError.scss";

interface FormErrorTypes {
    errorMessages: string[];
    setErrorMessages: (v: null) => any;
}

function FormError(props: FormErrorTypes) {
    const { errorMessages, setErrorMessages } = props;

    const [showFormError, setShowFormError] = useState(false);

    const [removeFormError, setRemoveFormError] = useState(false);
    const [hideFormError, setHideFormError] = useState(false);

    useEffect(() => {
        setShowFormError(true);
        const hideFormErrorTimer = setTimeout(
            () => setHideFormError(true),
            4500
        );
        const resetTimer = setTimeout(() => reset(), 5000);

        return () => {
            clearTimeout(hideFormErrorTimer);
            clearTimeout(resetTimer);
        };
    }, []);

    useEffect(() => {
        if (removeFormError) {
            setHideFormError(true);
            const removeErrorMessagesTimer = setTimeout(() => reset(), 500);

            return () => clearTimeout(removeErrorMessagesTimer);
        }
    }, [removeFormError]);

    function handleClickOnFormError() {
        setRemoveFormError(true);
    }

    function reset() {
        setErrorMessages(null);

        setShowFormError(false);

        setRemoveFormError(false);
        setHideFormError(false);
    }

    return (
        <div
            className={`form-error${showFormError ? " form-error--show" : ""}${
                hideFormError ? " form-error--hide" : ""
            }`}
            onClick={handleClickOnFormError}
        >
            {errorMessages.map((errorMessage, i) => (
                <p className="form-error__message" key={i}>
                    {errorMessage}
                </p>
            ))}
        </div>
    );
}

export default FormError;
