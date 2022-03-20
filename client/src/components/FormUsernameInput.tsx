import FormInput from "./FormInput";

interface FormUsernameInputTypes {
    autoFocus?: boolean;
    username: string;
    setUsername: (newValue: string) => void;
    usernameError: null | string;
    setUsernameError: (v: null | string) => any;
}

function FormUsernameInput(props: FormUsernameInputTypes) {
    const {
        autoFocus,
        username,
        setUsername,
        usernameError,
        setUsernameError,
    } = props;

    function handleUsernameChange(usernameInput: string) {
        const isValidUsername = validateUsername(usernameInput);

        if (!isValidUsername) {
            const errorMessage = `username must be between 3 and 32 characters long!`;
            setUsernameError(errorMessage);
        } else setUsernameError(null);

        setUsername(usernameInput);
    }

    function validateUsername(usernameInput: string) {
        const minLength = 3;
        const maxLength = 32;

        const usernameLength = usernameInput.length;
        const isValidUsername =
            usernameLength > minLength && usernameLength <= maxLength;

        if (usernameLength === 0 || isValidUsername) return true;
        return false;
    }

    return (
        <FormInput
            type="text"
            placeHolder="Username*"
            autoFocus={autoFocus}
            value={username}
            changeValue={handleUsernameChange}
            hasInvalidInput={usernameError ? true : false}
        />
    );
}

export default FormUsernameInput;
