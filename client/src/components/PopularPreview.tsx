import { useEffect, useState } from "react";
import SectionGrid from "./SectionGrid";
import SectionTitle from "./SectionTitle";
import WallpaperCard from "./WallpaperCard";
import "../styles/PopularPreview.scss";

function PopularPreview() {
    const [popularWallpapers, setPopularWallpapers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/posts/?sort=popular&limit=6");
            const wallpapers = await res.json();
            setPopularWallpapers(wallpapers);
        })();
    }, []);

    return (
        <SectionGrid>
            <div className="popular-preview__title">
                <SectionTitle
                    title={
                        <span>
                            MOST <br />
                            POPULAR <br />
                            WALLPAPERS
                        </span>
                    }
                />
            </div>

            {popularWallpapers.length > 0 &&
                popularWallpapers.map((wallpaper: any) => {
                    return (
                        <div className="popular-preview__card" key={wallpaper._id}>
                            <WallpaperCard data={wallpaper} />
                        </div>
                    );
                })}
        </SectionGrid>
    );
}

export default PopularPreview;
