import FormInput from "./FormInput";

interface FormEmailInputTypes {
    autoFocus?: boolean;
    email: string;
    setEmail: (v: string) => any;
    emailError: null | string;
    setEmailError: (v: null | string) => any;
}

function FormEmailInput(props: FormEmailInputTypes) {
    const { autoFocus, email, setEmail, emailError, setEmailError } = props;

    function handleEmailChange(emailInput: string) {
        const isValidEmail = validateEmail(emailInput);

        if (!isValidEmail) {
            const errorMessage = `email must be a valid email address between 3 and 128 characters long`;
            setEmailError(errorMessage);
        } else setEmailError(null);

        setEmail(emailInput);
    }

    function validateEmail(emailInput: string) {
        const minLength = 3;
        const maxLength = 128;
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        const emailLength = emailInput.length;
        const hasValidLength =
            emailLength > minLength && emailLength <= maxLength;
        const hasValidPattern = pattern.test(emailInput);

        const isValidEmail = hasValidLength && hasValidPattern;
        if (emailLength === 0 || isValidEmail) return true;
        return false;
    }

    return (
        <FormInput
            type="email"
            placeHolder="Email*"
            autoFocus={autoFocus}
            value={email}
            changeValue={handleEmailChange}
            hasInvalidInput={emailError ? true : false}
        />
    );
}

export default FormEmailInput;
