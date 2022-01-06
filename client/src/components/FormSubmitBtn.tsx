import "../styles/FormSubmitBtn.scss";

interface FormSubmitBtnTypes {
    value: string;
}

function FormSubmitBtn({ value }: FormSubmitBtnTypes) {
    return <input className="form-submit-btn" type="submit" value={value} />;
}

export default FormSubmitBtn;
