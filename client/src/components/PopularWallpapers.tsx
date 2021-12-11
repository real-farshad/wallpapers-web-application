import { useState, useEffect } from "react";
import InfiniteScrollWallpapers from "./InfiniteScrollWallpapers";
import SectionTitle from "./SectionTitle";
import "../styles/PopularWallpapers.scss";

function PopularWallpapers() {
    const [popularWallpapers, setPopularWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/posts/?sort=popular&limit=8");
            const wallpapers = await res.json();
            setPopularWallpapers(wallpapers);
        })();
    }, []);

    async function loadWallpapers() {
        const res = await fetch(`/api/posts/?sort=popular&page=${page}&limit=8`);
        const wallpapers = await res.json();

        setPopularWallpapers((prevState) => [...prevState, ...(wallpapers as never[])]);
        if (wallpapers.length < 8) setWallpapersFinished(true);
        setPage((prevState) => prevState + 1);
    }

    return (
        <div className="popular-wallpapers">
            <InfiniteScrollWallpapers
                wallpapers={popularWallpapers}
                loadWallpapers={loadWallpapers}
                wallpapersFinished={wallpapersFinished}
            >
                <div className="popular-wallpapers__info">
                    <div className="popular-wallpapers__period"></div>

                    <div className="popular-wallpapers__title">
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
                </div>
            </InfiniteScrollWallpapers>
        </div>
    );
}

export default PopularWallpapers;
