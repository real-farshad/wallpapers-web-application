import { useState } from "react";
import { useWallpaperContext } from "../contexts/WallpaperContext";
import makeStandardTimeString from "../utils/makeStandardTimeString";
import makeStandardCountString from "../utils/makeStandardCountString";
import CoverImage from "./CoverImage";
import "../styles/WallpaperCard.scss";

interface WallpaperCardTypes {
    data: {
        _id: string;
        publisher: { username: string };
        createdAt: number;
        imageUrl: { thumbnail: string };
        title: string;
        likeCount: number;
    };
}

function WallpaperCard(props: WallpaperCardTypes | any) {
    const { setWallpaperId } = useWallpaperContext();

    const { _id, publisher, createdAt, imageUrl, title, likeCount } =
        props.data;

    const standardPublishDate = makeStandardTimeString(createdAt);
    const standardLikeCount = makeStandardCountString(likeCount);

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
                    Published At {standardPublishDate}
                </p>
            </div>

            <div
                className="wallpaper-card__image-container"
                onClick={() => setWallpaperId(_id)}
            >
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
                            {standardLikeCount}
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
