import { useEffect, useState } from "react";
import StandardLayout from "../components/StandardLayout";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import InfiniteScroll from "../components/InfiniteScroll";
import WallpaperCard from "../components/WallpaperCard";

function New() {
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

    async function loadMoreWallpapers() {
        const res = await fetch(`/api/posts/?sort=new&page=${page}&limit=8`);
        const wallpapers = await res.json();

        setNewWallpapers((prevState) => [...prevState, ...(wallpapers as never[])]);
        if (wallpapers.length < 8) setWallpapersFinished(true);
        setPage((prevState) => prevState + 1);
    }

    return (
        <StandardLayout>
            <SectionGrid>
                <SectionInfoContainer>
                    <SectionTitle>
                        MOST <br />
                        RECENT <br />
                        WALLPAPERS
                    </SectionTitle>
                </SectionInfoContainer>

                <InfiniteScroll
                    elements={newWallpapers}
                    loadMoreElements={loadMoreWallpapers}
                    elementsFinished={wallpapersFinished}
                    template={<WallpaperCard />}
                />
            </SectionGrid>
        </StandardLayout>
    );
}

export default New;
