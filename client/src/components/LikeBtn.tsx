import StandardCount from "./StandardCount";
import "../styles/LikeBtn.scss";

interface LikeBtnTypes {
    likeCount: number;
}

function LikeBtn({ likeCount }: LikeBtnTypes) {
    return (
        <button className="like-btn">
            <p className="like-btn__text">LIKE</p>

            <p className="like-btn__count">
                <StandardCount count={likeCount} />
            </p>
        </button>
    );
}

export default LikeBtn;
