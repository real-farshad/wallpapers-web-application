import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentWidthContainer from "../components/ContentWidthContainer";
import CopyRight from "../components/CopyRight";
import FooterContainer from "../components/FooterContainer";
import HeaderContainer from "../components/HeaderContainer";
import InfiniteScroll from "../components/InfiniteScroll";
import MainContainer from "../components/MainContainer";
import Navbar from "../components/Navbar";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import WallpaperCard from "../components/WallpaperCard";

function Collection() {
    const { id } = useParams();

    const [wallpapers, setWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/collections-posts/${id}?limit=8`);
            const collectionWallpapers = await res.json();
            console.log(collectionWallpapers);
            setWallpapers(collectionWallpapers);
        })();
    }, []);

    async function loadMoreWallpapers() {
        const res = await fetch(`/api/collections-posts/${id}?page=${page}&limit=8`);
        const collectionWallpapers = await res.json();

        setWallpapers((prevState) => [
            ...prevState,
            ...(collectionWallpapers as never[]),
        ]);

        if (collectionWallpapers.length < 8) setWallpapersFinished(true);
        setPage((prevState) => prevState + 1);
    }

    if (wallpapers.length === 0) return null;

    return (
        <ContentWidthContainer>
            <HeaderContainer>
                <Navbar />
            </HeaderContainer>

            <MainContainer>
                <SectionGrid>
                    <SectionInfoContainer>
                        <SectionTitle>{"title here"}</SectionTitle>
                    </SectionInfoContainer>

                    <InfiniteScroll
                        elements={wallpapers}
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

export default Collection;
