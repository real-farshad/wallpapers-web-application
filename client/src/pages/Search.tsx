import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlexSectionTitle from "../components/FlexSectionTitle";
import InfiniteScroll from "../components/InfiniteScroll";
import SectionGrid from "../components/SectionGrid";
import StandardLayout from "../components/StandardLayout";
import WallpaperCard from "../components/WallpaperCard";

function Search() {
    const { text } = useParams();

    const [wallpapers, setWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/posts/?search=${text}&sort=new&limit=8`);
            const wallpapers = await res.json();
            setWallpapers(wallpapers);
        })();
    }, []);

    async function loadMoreWallpapers() {
        const res = await fetch(
            `/api/posts/?search=${text}&sort=new&page=${page}&limit=8`
        );
        const wallpapers = await res.json();

        setWallpapers((prevState) => [...prevState, ...(wallpapers as never[])]);
        if (wallpapers.length < 8) setWallpapersFinished(true);
        setPage((prevState) => prevState + 1);
    }

    return (
        <StandardLayout>
            <SectionGrid>
                <FlexSectionTitle>
                    <span>
                        RESULT
                        <br />
                        WALLPAPERS
                    </span>
                </FlexSectionTitle>

                <InfiniteScroll
                    elements={wallpapers}
                    loadMoreElements={loadMoreWallpapers}
                    elementsFinished={wallpapersFinished}
                    template={<WallpaperCard />}
                />
            </SectionGrid>
        </StandardLayout>
    );
}

export default Search;
