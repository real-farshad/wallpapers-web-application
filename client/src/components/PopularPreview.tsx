import SectionGrid from "./SectionGrid";
import SectionInfoContainer from "./SectionInfoContainer";
import SectionTitle from "./SectionTitle";
import WallpaperCard from "./WallpaperCard";
import "../styles/PopularPreview.scss";

function PopularPreview({ wallpapers }: any) {
    return (
        <SectionGrid>
            <div className="popular-preview__title">
                <SectionInfoContainer>
                    <SectionTitle>
                        MOST <br />
                        POPULAR <br />
                        WALLPAPERS
                    </SectionTitle>
                </SectionInfoContainer>
            </div>

            {wallpapers.length > 0 &&
                wallpapers.map((wallpaper: any) => {
                    return (
                        <div
                            className="popular-preview__card"
                            key={wallpaper._id}
                        >
                            <WallpaperCard data={wallpaper} />
                        </div>
                    );
                })}
        </SectionGrid>
    );
}

export default PopularPreview;
