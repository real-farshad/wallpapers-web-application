import { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import InfiniteScrollWallpapers from "./InfiniteScrollWallpapers";
import "../styles/NewWallpapers.scss";

function NewWallpapers() {
    const [newWallpapers, setNewWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/posts/?sort=new&limit=8");
            const wallpapers = await res.json();
            setNewWallpapers(wallpapers);
        })();
    }, []);

    async function loadWallpapers() {
        const res = await fetch(`/api/posts/?sort=new&page=${page}&limit=8`);
        const wallpapers = await res.json();

        setNewWallpapers((prevState) => [...prevState, ...(wallpapers as never[])]);
        if (wallpapers.length < 8) setWallpapersFinished(true);
        setPage((prevState) => prevState + 1);
    }

    return (
        <div className="new-wallpapers">
            <div className="new-wallpapers__info">
                <div className="new-wallpapers__period"></div>

                <div className="new-wallpapers__title">
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
            </div>

            <InfiniteScrollWallpapers
                wallpapers={newWallpapers}
                loadWallpapers={loadWallpapers}
                wallpapersFinished={wallpapersFinished}
            />
        </div>
    );
}

export default NewWallpapers;
