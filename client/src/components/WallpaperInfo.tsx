import UserAvatar from "./UserAvatar";
import StandardTime from "./StandardTime";
import StandardCount from "./StandardCount";
import "../styles/WallpaperInfo.scss";

interface WallpaperInfoTypes {
    info: {
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
    const { title, category, publisher, createdAt, likeCount } = props.info;

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
                            By @{publisher.username}
                        </p>

                        <p className="wallpaper-info__publish-date">
                            Published At <StandardTime time={createdAt} />
                        </p>
                    </div>
                </div>

                <div className="wallpaper-info__action-btns">
                    <button className="wallpaper-info__download-btn">
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
