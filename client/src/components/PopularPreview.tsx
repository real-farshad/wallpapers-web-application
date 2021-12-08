import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import StandardCard from "./StandardCard";
import "../styles/PopularPreview.scss";

function PopularPreview() {
    const [popularWallpapers, setPopularWallpapers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/posts/?sort=popular&limit=6");
            const wallpapers = await res.json();
            console.log(wallpapers);
            setPopularWallpapers(wallpapers);
        })();
    }, []);

    return (
        <div className="popular-preview">
            <div className="popular-preview__title">
                <SectionTitle
                    title={
                        <span>
                            MOST <br /> POPULAR <br /> WALLPAPERS
                        </span>
                    }
                />
            </div>

            {popularWallpapers.length > 0 &&
                popularWallpapers.map((wallpaper: any) => {
                    return (
                        <div className="popular-preview__card" key={wallpaper._id}>
                            <StandardCard data={wallpaper} />
                        </div>
                    );
                })}
        </div>
    );
}

export default PopularPreview;
