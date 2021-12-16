import "../styles/ControlBtn.scss";

interface ControlBtnTypes {
    active?: boolean;
    children: any;
}

function ControlBtn(props: ControlBtnTypes) {
    const { active, children } = props;

    return (
        <button className={`control-btn${active ? " control-btn--active" : ""}`}>
            {children}
        </button>
    );
}

export default ControlBtn;
