import StandardCount from "./StandardCount";
import "../styles/LikeBtn.scss";

interface LikeBtnTypes {
    liked: boolean;
    likeCount: number;
}

function LikeBtn(props: LikeBtnTypes) {
    const { liked, likeCount } = props;

    return (
        <button className="like-btn">
            <p className="like-btn__text">{liked ? "LIKED" : "LIKE"}</p>

            <p className="like-btn__count">
                <StandardCount count={likeCount} />
            </p>
        </button>
    );
}

export default LikeBtn;
