import "../styles/LikeBtn.scss";

function LikeBtn() {
    return (
        <button className="like-btn">
            <p className="like-btn__text">LIKE</p>

            <p className="like-btn__count">1.2k</p>
        </button>
    );
}

export default LikeBtn;
