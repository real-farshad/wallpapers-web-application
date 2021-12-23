import UserAvatar from "./UserAvatar";
import StandardTime from "./StandardTime";
import StandardCount from "./StandardCount";
import "../styles/WallpaperInfo.scss";

interface WallpaperInfoTypes {
    info: {
        imageUrl: {
            large: string;
        };
        title: string;
        category: {
            title: string;
        };
        publisher: {
            avatar: string;
            username: string;
        };
        createdAt: number;
        likeCount: number;
    };
}

function WallpaperInfo(props: WallpaperInfoTypes) {
    const { imageUrl, title, category, publisher, createdAt, likeCount } = props.info;

    async function handleClickOnDownload(e: any) {
        const res = await fetch(imageUrl.large);
        const result = await res.blob();
        saveBlob(result, title);
    }

    function saveBlob(blob: Blob, fileName: string) {
        const a: any = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";

        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
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
                            Published At <StandardTime time={createdAt} />
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

                    <button className="wallpaper-info__like-btn">
                        Like
                        <span className="wallpaper-info__like-count">
                            <StandardCount count={likeCount} />
                        </span>
                    </button>

                    <button className="wallpaper-info__save-btn">Save</button>
                </div>
            </div>
        </div>
    );
}

export default WallpaperInfo;
