import { useWallpaperContext } from "../contexts/WallpaperContext";
import makeStandardTimeString from "../utils/makeStandardTimeString";
import UserInfo from "./UserInfo";
import LikeBtn from "./LikeBtn";
import SaveBtn from "./SaveBtn";
import "../styles/WallpaperInfo.scss";

function WallpaperInfo() {
    const { wallpaper } = useWallpaperContext();
    const {
        _id,
        imageUrl,
        title,
        category,
        publisher,
        createdAt,
        likeCount,
        liked,
        saved,
    } = wallpaper;

    const standardPublishDate = makeStandardTimeString(createdAt);

    async function handleClickOnDownload(e: any) {
        const res = await fetch(imageUrl.large);
        const blob = await res.blob();

        const imageURL = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.style.display = "none";
        link.href = imageURL;
        link.download = title;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (!wallpaper) return null;

    return (
        <div className="wallpaper-info">
            <div className="wallpaper-info__primary-container">
                <h1 className="wallpaper-info__title">{title}</h1>

                <p className="wallpaper-info__category">
                    <span>{category}</span> Wallpaper
                </p>
            </div>

            <div className="wallpaper-info__secondary-container">
                <div className="wallpaper-info__publisher">
                    <UserInfo
                        avatar={publisher.avatar}
                        username={publisher.username}
                        timeString={`Published At ${standardPublishDate}`}
                    />
                </div>
                <div className="wallpaper-info__action-btns">
                    <button
                        className="wallpaper-info__download-btn"
                        onClick={handleClickOnDownload}
                    >
                        Download Wallpaper
                        <span className="wallpaper-info__download-btn-description">
                            High Resolution
                        </span>
                    </button>

                    <LikeBtn
                        wallpaperId={_id}
                        isLiked={liked}
                        likeCount={likeCount}
                    />

                    <SaveBtn wallpaperId={_id} isSaved={saved} />
                </div>
            </div>
        </div>
    );
}

export default WallpaperInfo;
