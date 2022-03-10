import { useEffect, useState } from "react";
import getLikedWallpapers from "../api/getLikedWallpapers";
import getUserLikesCount from "../api/getUserLikesCount";
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

function Likes() {
    const [page, setPage] = useState(1);
    const limit = 8;

    const [userLikesCount, setUserLikesCount] = useState(0);
    const [wallpapers, setWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);

    useEffect(() => {
        if (page === 1) addLikedWallpapersCount();
        addLikedWallpapers();
    }, [page]);

    async function addLikedWallpapersCount() {
        const count = await getUserLikesCount();
        setUserLikesCount(count);
    }

    async function addLikedWallpapers() {
        const wallpapers = await getLikedWallpapers(page, limit);
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
                            {userLikesCount} <br />
                            LIKED <br />
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

export default Likes;
