import { Fragment } from "react";
import WallpaperInfo from "./WallpaperInfo";
import WallpaperComments from "./WallpaperComments";
import "../styles/WallpaperContent.scss";

function WallpaperContent() {
    return (
        <Fragment>
            <div className="wallpaper-content">
                <div className="wallpaper-content__info-section">
                    <WallpaperInfo />
                </div>

                <div className="wallpaper-content__comment-section">
                    <WallpaperComments />
                </div>
            </div>
        </Fragment>
    );
}

export default WallpaperContent;
