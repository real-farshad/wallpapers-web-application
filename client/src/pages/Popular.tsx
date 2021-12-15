import { useEffect, useState } from "react";
import StandardLayout from "../components/StandardLayout";
import SectionGrid from "../components/SectionGrid";
import SectionTitle from "../components/SectionTitle";
import InfiniteScroll from "../components/InfiniteScroll";
import WallpaperCard from "../components/WallpaperCard";
import "../styles/Popular.scss";

function Popular() {
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

    async function loadMoreWallpapers() {
        const res = await fetch(`/api/posts/?sort=popular&page=${page}&limit=8`);
        const wallpapers = await res.json();

        setPopularWallpapers((prevState) => [...prevState, ...(wallpapers as never[])]);
        if (wallpapers.length < 8) setWallpapersFinished(true);
        setPage((prevState) => prevState + 1);
    }

    return (
        <StandardLayout>
            <SectionGrid>
                <div className="popular__info">
                    <div className="popular__duration">
                        <button className="popular__duration-btn popular__duration-btn--active">
                            2021 And After
                        </button>
                        <button className="popular__duration-btn">2020 And After</button>
                        <button className="popular__duration-btn">All Times</button>
                    </div>

                    <div className="popular__title">
                        <SectionTitle>
                            <span>
                                MOST <br />
                                POPULAR <br />
                                WALLPAPERS
                            </span>
                        </SectionTitle>
                    </div>
                </div>

                <InfiniteScroll
                    elements={popularWallpapers}
                    loadMoreElements={loadMoreWallpapers}
                    elementsFinished={wallpapersFinished}
                    template={<WallpaperCard />}
                />
            </SectionGrid>
        </StandardLayout>
    );
}

export default Popular;
