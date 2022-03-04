import { useEffect, useState } from "react";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import StandardNavbar from "../components/StandardNavbar";
import MainContainer from "../components/MainContainer";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import FooterContainer from "../components/FooterContainer";
import CopyRight from "../components/CopyRight";
import searchWallpapers from "../api/searchWallpapers";
import WallpapersInfiniteScroll from "../components/WallpapersInfiniteScroll";

function New() {
    const sort = "new";
    const [page, setPage] = useState(1);
    const limit = 8;

    const [newWallpapers, setNewWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);

    useEffect(() => {
        addNewWallpapers();
    }, [page]);

    async function addNewWallpapers() {
        const wallpapers = await searchWallpapers({ sort, page, limit });
        setNewWallpapers((prevState) => [
            ...prevState,
            ...(wallpapers as never[]),
        ]);

        if (wallpapers.length < limit) {
            setWallpapersFinished(true);
        }
    }

    return (
        <ContentWidthContainer>
            <HeaderContainer>
                <StandardNavbar />
            </HeaderContainer>

            <MainContainer>
                <SectionGrid>
                    <SectionInfoContainer>
                        <SectionTitle>
                            MOST <br />
                            RECENT <br />
                            WALLPAPERS
                        </SectionTitle>
                    </SectionInfoContainer>

                    <WallpapersInfiniteScroll
                        wallpapers={newWallpapers}
                        wallpapersFinished={wallpapersFinished}
                        setPage={setPage}
                    />
                </SectionGrid>
            </MainContainer>

            <FooterContainer>
                <CopyRight />
            </FooterContainer>
        </ContentWidthContainer>
    );
}

export default New;
