import { useState } from "react";
import CoverImage from "./CoverImage";
import LikeBtn from "./LikeBtn";
import SaveBtn from "./SaveBtn";
import StandardTime from "./StandardTime";
import "../styles/WallpaperCard.scss";

interface WallpaperCardTypes {
    data: {
        publisher: { username: string };
        createdAt: number;
        imageUrl: { thumbnail: string };
        title: string;
        likeCount: number;
    };
}

function WallpaperCard(props: WallpaperCardTypes) {
    const { publisher, createdAt, imageUrl, title, likeCount } = props.data;

    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    function handleClickOnLike() {
        setLiked((prevState) => !prevState);
    }

    function handleClickOnSave() {
        setSaved((prevState) => !prevState);
    }

    return (
        <div className="wallpaper-card">
            <div className="wallpaper-card__primary-info-container">
                <p className="wallpaper-card__publisher">
                    By <a href="#">@{publisher.username}</a>
                </p>

                <p className="wallpaper-card__publish-date">
                    Published At <StandardTime time={createdAt} />
                </p>
            </div>

            <div className="wallpaper-card__image-container">
                <CoverImage src={imageUrl.thumbnail} />

                <div className="wallpaper-card__image-overlay" />

                <h1 className="wallpaper-card__title">{title}</h1>
            </div>

            <div className="wallpaper-card__btns">
                <div className="wallpaper-card__like-btn" onClick={handleClickOnLike}>
                    <LikeBtn liked={liked} likeCount={likeCount} />
                </div>

                <div onClick={handleClickOnSave}>
                    <SaveBtn saved={saved} />
                </div>
            </div>
        </div>
    );
}

export default WallpaperCard;
