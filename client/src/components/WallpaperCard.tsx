import { useWallpaperContext } from "../contexts/WallpaperContext";
import makeStandardTimeString from "../utils/makeStandardTimeString";
import CoverImage from "./CoverImage";
import LikeBtn from "./LikeBtn";
import SaveBtn from "./SaveBtn";
import "../styles/WallpaperCard.scss";
import { useEffect, useState } from "react";

interface WallpaperCardTypes {
    data: {
        _id: string;
        publisher: { username: string };
        createdAt: number;
        imageUrl: { thumbnail: string };
        title: string;
        likeCount: number;
        liked?: boolean;
        saved?: boolean;
    };
}

function WallpaperCard(props: WallpaperCardTypes | any) {
    const { _id, publisher, createdAt, imageUrl, title, likeCount } =
        props.data;

    const { setWallpaperId } = useWallpaperContext();

    const [liked, setLiked] = useState(
        props.data.liked ? props.data.liked : false
    );

    const [saved, setSaved] = useState(
        props.data.saved ? props.data.saved : false
    );

    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState(null as null | string);

    useEffect(() => {
        if (prompt) {
            setTimeout(() => {
                setPrompt(null);
            }, 1000);
        }
    }, [prompt]);

    const standardPublishDate = makeStandardTimeString(createdAt);

    return (
        <div className="wallpaper-card">
            <div className="wallpaper-card__primary-info">
                <p className="wallpaper-card__publisher">
                    By <a href="/#">@{publisher}</a>
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

                {loading && <div className="wallpaper-card__loading" />}

                {prompt && (
                    <div className="wallpaper-card__prompt">
                        <div className="wallpaper-card__prompt-background" />
                        <p className="wallpaper-card__prompt-text">{prompt}</p>
                    </div>
                )}

                <h1 className="wallpaper-card__title wallpaper-card__title--lg">
                    {title}
                </h1>
            </div>

            <div className="wallpaper-card__secondary-info">
                <h1 className="wallpaper-card__title wallpaper-card__title--sm">
                    {title}
                </h1>

                <div className="wallpaper-card__btns-container">
                    <div className="wallpaper-card__like-btn">
                        <LikeBtn
                            wallpaperId={_id}
                            liked={liked}
                            setLiked={setLiked}
                            likeCount={likeCount}
                            loading={loading}
                            setLoading={setLoading}
                            prompt={prompt}
                            setPrompt={setPrompt}
                            secondaryStyle
                        />
                    </div>

                    <SaveBtn
                        wallpaperId={_id}
                        saved={saved}
                        setSaved={setSaved}
                        loading={loading}
                        setLoading={setLoading}
                        prompt={prompt}
                        setPrompt={setPrompt}
                        secondaryStyle
                    />
                </div>
            </div>
        </div>
    );
}

export default WallpaperCard;
