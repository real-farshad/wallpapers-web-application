import FormInput from "./FormInput";

interface FormEmailInputTypes {
    autoFocus?: boolean;
    value: string;
    changeValue: (newValue: string) => void;
}

function FormEmailInput(props: FormEmailInputTypes) {
    const { autoFocus, value, changeValue } = props;

    return (
        <FormInput
            type="email"
            placeHolder="Email*"
            autoFocus={autoFocus}
            value={value}
            changeValue={changeValue}
        />
    );
}

export default FormEmailInput;
