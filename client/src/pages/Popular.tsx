import { useEffect, useState } from "react";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import Navbar from "../components/Navbar";
import MainContainer from "../components/MainContainer";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import ControlBtnsContainer from "../components/ControlBtnsContainer";
import ControlBtn from "../components/ControlBtn";
import SectionTitle from "../components/SectionTitle";
import InfiniteScroll from "../components/InfiniteScroll";
import WallpaperCard from "../components/WallpaperCard";
import FooterContainer from "../components/FooterContainer";
import CopyRight from "../components/CopyRight";

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
        <ContentWidthContainer>
            <HeaderContainer>
                <Navbar />
            </HeaderContainer>

            <MainContainer>
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
            </MainContainer>

            <FooterContainer>
                <CopyRight />
            </FooterContainer>
        </ContentWidthContainer>
    );
}

export default Popular;
