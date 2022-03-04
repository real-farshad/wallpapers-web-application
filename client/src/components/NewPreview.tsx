import { useEffect, useState } from "react";
import searchWallpapers from "../api/searchWallpapers";
import SectionGrid from "./SectionGrid";
import SectionInfoContainer from "./SectionInfoContainer";
import SectionTitle from "./SectionTitle";
import WallpaperCard from "./WallpaperCard";
import "../styles/NewPreview.scss";

function NewPreview() {
    const sort = "new";
    const page = 1;
    const limit = 1;

    const [newWallpapers, setNewWallpapers] = useState([]);

    useEffect(() => {
        addNewWallpapers();
    }, []);

    async function addNewWallpapers() {
        const wallpapers = await searchWallpapers({ sort, page, limit });
        setNewWallpapers(wallpapers);
    }

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

            {newWallpapers.length > 0 &&
                newWallpapers.map((wallpaper: any) => {
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
