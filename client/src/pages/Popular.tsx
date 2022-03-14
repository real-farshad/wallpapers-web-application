import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoadingContext } from "../contexts/loadingContext";
import searchWallpapers from "../api/searchWallpapers";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import StandardNavbar from "../components/StandardNavbar";
import MainContainer from "../components/MainContainer";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import ControlBtnsContainer from "../components/ControlBtnsContainer";
import ControlBtn from "../components/ControlBtn";
import SectionTitle from "../components/SectionTitle";
import WallpapersInfiniteScroll from "../components/WallpapersInfiniteScroll";
import FooterContainer from "../components/FooterContainer";
import CopyRight from "../components/CopyRight";

function Popular() {
    const [searchParams, setSearchParams] = useSearchParams();

    const { startLoading, finishLoading } = useLoadingContext();

    const sort = "popular";
    const duration = searchParams.get("duration");
    const [page, setPage] = useState(1);
    const limit = 8;

    const [popularWallpapers, setPopularWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);

    useEffect(() => {
        startLoading();
        addPopularWallpapers();
        finishLoading();
    }, [searchParams]);

    useEffect(() => {
        if (page !== 1) addPopularWallpapers();
    }, [page]);

    async function addPopularWallpapers() {
        const wallpapers = await searchWallpapers({
            sort,
            duration: duration ? duration : "",
            page,
            limit,
        });

        setPopularWallpapers((prevWallpapers) => [
            ...prevWallpapers,
            ...(wallpapers as never[]),
        ]);

        if (wallpapers.length < limit) {
            setWallpapersFinished(true);
        }
    }

    function changeDuration(newDuration?: any) {
        setPage(1);
        setPopularWallpapers([]);
        setWallpapersFinished(false);

        const durationObject: any = {};
        if (newDuration) durationObject.duration = newDuration;
        setSearchParams(durationObject);
    }

    const controls = (
        <ControlBtnsContainer>
            <div onClick={() => changeDuration("2021")}>
                <ControlBtn active={duration === "2021"}>
                    2021 And After
                </ControlBtn>
            </div>

            <div onClick={() => changeDuration("2020")}>
                <ControlBtn active={duration === "2020"}>
                    2020 And After
                </ControlBtn>
            </div>

            <div onClick={() => changeDuration()}>
                <ControlBtn active={!duration}>All Times</ControlBtn>
            </div>
        </ControlBtnsContainer>
    );

    return (
        <ContentWidthContainer>
            <HeaderContainer>
                <StandardNavbar />
            </HeaderContainer>

            <MainContainer>
                <SectionGrid>
                    <SectionInfoContainer controls>
                        {controls}

                        <SectionTitle>
                            MOST <br />
                            POPULAR <br />
                            WALLPAPERS
                        </SectionTitle>
                    </SectionInfoContainer>

                    <WallpapersInfiniteScroll
                        wallpapers={popularWallpapers}
                        wallpapersFinished={wallpapersFinished}
                        setPage={setPage as any}
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
