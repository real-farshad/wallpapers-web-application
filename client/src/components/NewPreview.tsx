import { useEffect, useState } from "react";
import SectionGrid from "./SectionGrid";
import SectionTitle from "./SectionTitle";
import WallpaperCard from "./WallpaperCard";
import "../styles/NewPreview.scss";

function NewPreview() {
    const [newWallpapers, setNewWallpapers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/posts/?limit=6");
            const wallpapers = await res.json();
            setNewWallpapers(wallpapers);
        })();
    }, []);

    return (
        <SectionGrid>
            <div className="new-preview__title">
                <SectionTitle
                    title={
                        <span>
                            MOST <br />
                            RECENT <br />
                            WALLPAPERS
                        </span>
                    }
                />
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
