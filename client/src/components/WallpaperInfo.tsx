import SectionTitle from "./SectionTitle";
import UserAvatar from "./UserAvatar";
import StandardTime from "./StandardTime";
import "../styles/WallpaperInfo.scss";

import avatar from "../assets/avatar.jpg";

function WallpaperInfo() {
    return (
        <div className="wallpaper-info">
            <div className="wallpaper-info__primary-container">
                <div className="wallpaper-info__title">
                    <SectionTitle>Darling In The Franxx</SectionTitle>
                </div>

                <p className="wallpaper-info__category">Anime Wallpaper</p>
            </div>

            <div className="wallpaper-info__secondary-container">
                <div className="wallpaper-info__publisher">
                    <div className="wallpaper-info__publisher-avatar">
                        <UserAvatar src={avatar} />
                    </div>

                    <div className="wallpaper-info__publisher-info">
                        <p className="wallpaper-info__username">By @Kara</p>

                        <p className="wallpaper-info__publish-date">
                            Published At <StandardTime time={Date.now()} />
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
                        <span className="wallpaper-info__like-count">1.2k</span>
                    </button>

                    <button className="wallpaper-info__save-btn">Save</button>
                </div>
            </div>
        </div>
    );
}

export default WallpaperInfo;
