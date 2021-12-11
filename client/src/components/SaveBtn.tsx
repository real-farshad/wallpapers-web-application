import "../styles/SaveBtn.scss";

interface SaveBtnTypes {
    saved: boolean;
}

function SaveBtn(props: SaveBtnTypes) {
    const { saved } = props;
    return <button className="save-btn">{saved ? "SAVED" : "SAVE"}</button>;
}

export default SaveBtn;
