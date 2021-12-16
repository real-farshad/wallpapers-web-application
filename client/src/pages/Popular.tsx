import { useEffect, useState } from "react";
import StandardLayout from "../components/StandardLayout";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import ControlBtnsContainer from "../components/ControlBtnsContainer";
import ControlBtn from "../components/ControlBtn";
import SectionTitle from "../components/SectionTitle";
import InfiniteScroll from "../components/InfiniteScroll";
import WallpaperCard from "../components/WallpaperCard";

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
                <SectionInfoContainer twoRows>
                    <ControlBtnsContainer>
                        <div>
                            <ControlBtn active>2021 And After</ControlBtn>
                        </div>

                        <div>
                            <ControlBtn>2020 And After</ControlBtn>
                        </div>

                        <div>
                            <ControlBtn>All Times</ControlBtn>
                        </div>
                    </ControlBtnsContainer>

                    <SectionTitle>
                        MOST <br />
                        POPULAR <br />
                        WALLPAPERS
                    </SectionTitle>
                </SectionInfoContainer>

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
