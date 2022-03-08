import { useWallpaperContext } from "../contexts/WallpaperContext";
import makeStandardTimeString from "../utils/makeStandardTimeString";
import UserAvatar from "./UserAvatar";
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

    console.log(wallpaper);

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

    return (
        <div className="wallpaper-info">
            <div className="wallpaper-info__primary-container">
                <h1 className="wallpaper-info__title">{title}</h1>

                <p className="wallpaper-info__category">
                    <span>{category.title}</span> Wallpaper
                </p>
            </div>

            <div className="wallpaper-info__secondary-container">
                <div className="wallpaper-info__publisher">
                    <div className="wallpaper-info__publisher-avatar">
                        <UserAvatar src={publisher.avatar} />
                    </div>

                    <div className="wallpaper-info__publisher-info">
                        <p className="wallpaper-info__username">
                            By <button>@{publisher.username}</button>
                        </p>

                        <p className="wallpaper-info__publish-date">
                            Published At {standardPublishDate}
                        </p>
                    </div>
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
