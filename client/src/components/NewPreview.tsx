import SectionGrid from "./SectionGrid";
import SectionInfoContainer from "./SectionInfoContainer";
import SectionTitle from "./SectionTitle";
import WallpaperCard from "./WallpaperCard";
import "../styles/NewPreview.scss";

function NewPreview({ wallpapers }: any) {
    return (
        <SectionGrid>
            <div className="new-preview__title">
                <SectionInfoContainer>
                    <SectionTitle>
                        MOST <br />
                        RECENT <br />
                        WALLPAPERS
                    </SectionTitle>
                </SectionInfoContainer>
            </div>

            {wallpapers.length > 0 &&
                wallpapers.map((wallpaper: any) => {
                    return (
                        <div className="new-preview__card" key={wallpaper._id}>
                            <WallpaperCard data={wallpaper} />
                        </div>
                    );
                })}
        </SectionGrid>
    );
}

export default NewPreview;
