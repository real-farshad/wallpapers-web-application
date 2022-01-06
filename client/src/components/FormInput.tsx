import "../styles/FormInput.scss";

interface FormInputTypes {
    type: string;
    placeHolder: string;
    autoFocus?: boolean;
    value: string;
    changeValue: (newValue: string) => void;
}

function FormInput(props: FormInputTypes) {
    const { type, placeHolder, value, changeValue } = props;
    const autoFocus = props.autoFocus ? true : false;

    function handleInputChange(e: any) {
        changeValue(e.target.value);
    }

    return (
        <input
            className="form-input"
            type={type}
            placeholder={placeHolder}
            autoFocus={autoFocus}
            autoComplete="off"
            value={value}
            onChange={handleInputChange}
        />
    );
}

export default FormInput;
