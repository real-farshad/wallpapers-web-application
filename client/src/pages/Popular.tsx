import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import StandardNavbar from "../components/StandardNavbar";
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
    const [searchParams, setSearchParams] = useSearchParams();
    const duration = searchParams.get("duration");

    const [popularWallpapers, setPopularWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        (async () => {
            const url = `/api/wallpapers/?${
                duration ? `duration=${duration}&` : ""
            }sort=popular&limit=8`;

            const res = await fetch(url);
            const wallpapers = await res.json();
            console.log(wallpapers);

            setPopularWallpapers(wallpapers);
        })();
    }, [searchParams]);

    async function loadMoreWallpapers() {
        const url = `/api/wallpapers/?${
            duration ? `duration=${duration}&` : ""
        }sort=popular&page=${page}&limit=8`;

        const res = await fetch(url);
        const wallpapers = await res.json();

        setPopularWallpapers((prevState) => [
            ...prevState,
            ...(wallpapers as never[]),
        ]);
        if (wallpapers.length < 8) setWallpapersFinished(true);
        setPage((prevState) => prevState + 1);
    }

    return (
        <ContentWidthContainer>
            <HeaderContainer>
                <StandardNavbar />
            </HeaderContainer>

            <MainContainer>
                <SectionGrid>
                    <SectionInfoContainer controls>
                        <ControlBtnsContainer>
                            <div
                                onClick={() => {
                                    setSearchParams({ duration: "2021" });
                                }}
                            >
                                <ControlBtn active={duration === "2021"}>
                                    2021 And After
                                </ControlBtn>
                            </div>

                            <div
                                onClick={() => {
                                    setSearchParams({ duration: "2020" });
                                }}
                            >
                                <ControlBtn active={duration === "2020"}>
                                    2020 And After
                                </ControlBtn>
                            </div>

                            <div
                                onClick={() => {
                                    setSearchParams({});
                                }}
                            >
                                <ControlBtn active={!duration}>
                                    All Times
                                </ControlBtn>
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
