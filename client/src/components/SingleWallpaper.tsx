import CoverImage from "./CoverImage";
import ContentWidthContainer from "./ContentWidthContainer";
import AuthBtns from "./AuthBtns";
import WallpaperInfo from "./WallpaperInfo";
import CommentsContainer from "./CommentsContainer";
import "../styles/SingleWallpaper.scss";

import wallpaperBg from "../assets/wallpaper-bg.jpg";

function SingleWallpaper() {
    return (
        <div className="single-wallpaper">
            <div className="single-wallpaper__background">
                <CoverImage src={wallpaperBg} />

                <div className="single-wallpaper__background-overlay" />
            </div>

            <ContentWidthContainer>
                <div className="single-wallpaper__layout">
                    <div className="single-wallpaper__navbar">
                        <button className="single-wallpaper__go-back-btn">GO BACK</button>

                        <div>
                            <AuthBtns />
                        </div>
                    </div>

                    <div className="single-wallpaper__content-container">
                        <div className="single-wallpaper__info">
                            <WallpaperInfo />
                        </div>

                        <div className="single-wallpaper__comments">
                            <CommentsContainer />
                        </div>
                    </div>
                </div>
            </ContentWidthContainer>
        </div>
    );
}

export default SingleWallpaper;
