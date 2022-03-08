import { useState } from "react";
import likeWallpaper from "../api/likeWallpaper";
import makeStandardCountString from "../utils/makeStandardCountString";
import "../styles/LikeBtn.scss";
import unlikeWallpaper from "../api/unlikeWallpaper";

interface LikeBtnTypes {
    wallpaperId: string;
    isLiked: boolean;
    likeCount: number;
    secondaryStyle?: boolean;
}

function LikeBtn(props: LikeBtnTypes) {
    const { wallpaperId, isLiked, likeCount, secondaryStyle } = props;
    const standardLikeCount = makeStandardCountString(likeCount);

    const [liked, setLiked] = useState(isLiked);

    function handleClickOnLike() {
        if (liked) handleUnlike();
        else handleLike();
    }

    async function handleLike() {
        const success = await likeWallpaper(wallpaperId);
        if (success) setLiked(true);
    }

    async function handleUnlike() {
        const success = await unlikeWallpaper(wallpaperId);
        if (success) setLiked(false);
    }

    return (
        <button className="like-btn" onClick={handleClickOnLike}>
            <p
                className={`like-btn__text${
                    secondaryStyle ? " like-btn__text--all-caps" : ""
                }`}
            >
                {liked ? "Liked" : "Like"}
            </p>

            <p
                className={`like-btn__count${
                    secondaryStyle ? " like-btn__count--low-opacity" : ""
                }`}
            >
                {standardLikeCount}
            </p>
        </button>
    );
}

export default LikeBtn;
