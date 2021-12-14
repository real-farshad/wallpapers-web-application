import { useState } from "react";
import StandardTime from "./StandardTime";
import CoverImage from "./CoverImage";
import StandardCount from "./StandardCount";
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

function WallpaperCard(props: WallpaperCardTypes | any) {
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
            <div className="wallpaper-card__primary-info">
                <p className="wallpaper-card__publisher">
                    By <a href="/#">@{publisher.username}</a>
                </p>

                <p className="wallpaper-card__publish-date">
                    Published At <StandardTime time={createdAt} />
                </p>
            </div>

            <div className="wallpaper-card__image-container">
                <CoverImage src={imageUrl.thumbnail} />

                <div className="wallpaper-card__image-overlay" />

                <h1 className="wallpaper-card__title wallpaper-card__title--lg">
                    {title}
                </h1>
            </div>

            <div className="wallpaper-card__secondary-info">
                <h1 className="wallpaper-card__title wallpaper-card__title--sm">
                    {title}
                </h1>

                <div className="wallpaper-card__btns-container">
                    <button
                        className="wallpaper-card__like-btn"
                        onClick={handleClickOnLike}
                    >
                        <p className="wallpaper-card__like-text">
                            {liked ? "LIKED" : "LIKE"}
                        </p>

                        <p className="wallpaper-card__like-count">
                            <StandardCount count={likeCount} />
                        </p>
                    </button>

                    <button
                        className="wallpaper-card__save-btn"
                        onClick={handleClickOnSave}
                    >
                        {saved ? "SAVED" : "SAVE"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WallpaperCard;
