import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentWidthContainer from "../components/ContentWidthContainer";
import CopyRight from "../components/CopyRight";
import FooterContainer from "../components/FooterContainer";
import HeaderContainer from "../components/HeaderContainer";
import InfiniteScroll from "../components/InfiniteScroll";
import MainContainer from "../components/MainContainer";
import StandardNavbar from "../components/StandardNavbar";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import WallpaperCard from "../components/WallpaperCard";
import "../styles/Collection.scss";

function Collection() {
    const { id } = useParams();

    const [collectionInfo, setCollectionInfo] = useState(null as any);
    const [wallpapers, setWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        (async () => {
            const collectionsRes = await fetch(`/api/collections/${id}`);
            const collectionInfo = await collectionsRes.json();
            setCollectionInfo(collectionInfo);

            const res = await fetch(`/api/collections-records/${id}?limit=8`);
            const collectionWallpapers = await res.json();
            setWallpapers(collectionWallpapers);
        })();
    }, []);

    async function loadMoreWallpapers() {
        const res = await fetch(
            `api/collections-records/${id}?page=${page}&limit=8`
        );
        const collectionWallpapers = await res.json();

        setWallpapers((prevState) => [
            ...prevState,
            ...(collectionWallpapers as never[]),
        ]);

        if (collectionWallpapers.length < 8) setWallpapersFinished(true);
        setPage((prevState) => prevState + 1);
    }

    if (!collectionInfo || wallpapers.length === 0) return null;

    return (
        <ContentWidthContainer>
            <div className="collection">
                <HeaderContainer>
                    <StandardNavbar />
                </HeaderContainer>

                <div className="collection__container">
                    <MainContainer>
                        <SectionGrid>
                            <SectionInfoContainer>
                                <SectionTitle>
                                    {collectionInfo.title}
                                </SectionTitle>
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
                </div>
            </div>
        </ContentWidthContainer>
    );
}

export default Collection;
