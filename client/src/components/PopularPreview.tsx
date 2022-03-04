import { useEffect, useState } from "react";
import searchWallpapers from "../api/searchWallpapers";
import SectionGrid from "./SectionGrid";
import SectionInfoContainer from "./SectionInfoContainer";
import SectionTitle from "./SectionTitle";
import WallpaperCard from "./WallpaperCard";
import "../styles/PopularPreview.scss";

function PopularPreview() {
    const sort = "popular";
    const page = 1;
    const limit = 6;

    const [popularWallpapers, setPopularWallpapers] = useState([]);

    useEffect(() => {
        addPopularWallpapers();
    }, []);

    async function addPopularWallpapers() {
        const wallpapers = await searchWallpapers({ sort, page, limit });
        setPopularWallpapers(wallpapers);
    }

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

            {popularWallpapers.length > 0 &&
                popularWallpapers.map((wallpaper: any) => {
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
