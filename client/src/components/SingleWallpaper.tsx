import CoverImage from "./CoverImage";
import "../styles/SingleWallpaper.scss";

import wallpaperBg from "../assets/wallpaper-bg.jpg";
import ContentWidthContainer from "./ContentWidthContainer";
import Navbar from "./Navbar";

function SingleWallpaper() {
    return (
        <div className="single-wallpaper">
            <div className="single-wallpaper__background">
                <CoverImage src={wallpaperBg} />

                <div className="single-wallpaper__background-overlay" />
            </div>

            <ContentWidthContainer>
                <div className="single-wallpaper__navbar">
                    <Navbar />
                </div>

                <div>
                    <div></div>

                    <div></div>
                </div>
            </ContentWidthContainer>
        </div>
    );
}

export default SingleWallpaper;
