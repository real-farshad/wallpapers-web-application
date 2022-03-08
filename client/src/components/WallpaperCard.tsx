import { useWallpaperContext } from "../contexts/WallpaperContext";
import makeStandardTimeString from "../utils/makeStandardTimeString";
import CoverImage from "./CoverImage";
import LikeBtn from "./LikeBtn";
import SaveBtn from "./SaveBtn";
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
                    <div className="wallpaper-card__like-btn">
                        <LikeBtn
                            wallpaperId={_id}
                            isLiked={false}
                            likeCount={likeCount}
                            secondaryStyle
                        />
                    </div>

                    <SaveBtn wallpaperId={_id} isSaved={false} secondaryStyle />
                </div>
            </div>
        </div>
    );
}

export default WallpaperCard;
