import "../styles/WallpaperLayout.scss";
import ContentWidthContainer from "./ContentWidthContainer";
import CoverImage from "./CoverImage";

interface WallpaperLayoutTypes {
    backgroundImage: string;
    children: any;
}

function WallpaperLayout(props: WallpaperLayoutTypes) {
    const { backgroundImage, children } = props;

    return (
        <div className="wallpaper-layout">
            <div className="wallpaper-layout__background">
                <CoverImage src={backgroundImage} />

                <div className="wallpaper-layout__background-overlay" />
            </div>

            <ContentWidthContainer>
                <div className="wallpaper-layout__content">{children}</div>
            </ContentWidthContainer>
        </div>
    );
}

export default WallpaperLayout;
