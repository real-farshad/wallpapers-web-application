import { useEffect, useState } from "react";
import getUserSavesCount from "../api/getUserSavesCount";
import getSavedWallpapers from "../api/getSavedWallpapers";
import ContentWidthContainer from "../components/ContentWidthContainer";
import CopyRight from "../components/CopyRight";
import FooterContainer from "../components/FooterContainer";
import HeaderContainer from "../components/HeaderContainer";
import MainContainer from "../components/MainContainer";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import StandardNavbar from "../components/StandardNavbar";
import WallpapersInfiniteScroll from "../components/WallpapersInfiniteScroll";

function Saves() {
    const [page, setPage] = useState(1);
    const limit = 8;

    const [userSavesCount, setUserSavesCount] = useState(0);
    const [wallpapers, setWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);

    useEffect(() => {
        if (page === 1) addUserSavesCount();
        addSavedWallpapers();
    }, [page]);

    async function addUserSavesCount() {
        const count = await getUserSavesCount();
        setUserSavesCount(count);
    }

    async function addSavedWallpapers() {
        const wallpapers = await getSavedWallpapers(page, limit);
        setWallpapers((prevState) => [
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
                            {userSavesCount} <br />
                            Saved <br />
                            WALLPAPERS
                        </SectionTitle>
                    </SectionInfoContainer>

                    <WallpapersInfiniteScroll
                        wallpapers={wallpapers}
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

export default Saves;
