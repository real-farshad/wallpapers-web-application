import FormInput from "./FormInput";

interface FormUsernameInputTypes {
    autoFocus?: boolean;
    value: string;
    changeValue: (newValue: string) => void;
}

function FormUsernameInput(props: FormUsernameInputTypes) {
    const { autoFocus, value, changeValue } = props;

    return (
        <FormInput
            type="text"
            placeHolder="Username*"
            autoFocus={autoFocus}
            value={value}
            changeValue={changeValue}
        />
    );
}

export default FormUsernameInput;
