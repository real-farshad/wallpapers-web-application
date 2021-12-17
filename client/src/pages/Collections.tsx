import { useEffect, useState } from "react";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import Navbar from "../components/Navbar";
import MainContainer from "../components/MainContainer";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import InfiniteScroll from "../components/InfiniteScroll";
import CollectionCard from "../components/CollectionCard";
import FooterContainer from "../components/FooterContainer";
import CopyRight from "../components/CopyRight";

function Collections() {
    const [popularCollections, setPopularCollections] = useState([]);
    const [collectionsFinished, setCollectionsFinished] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/collections/?sort=new&limit=8");
            const collections = await res.json();
            setPopularCollections(collections);
        })();
    }, []);

    async function loadMoreCollections() {
        const res = await fetch(`/api/collections/?sort=new&page=${page}&limit=8`);
        const collections = await res.json();

        setPopularCollections((prevState) => [...prevState, ...(collections as never[])]);
        if (collections.length < 8) setCollectionsFinished(true);
        setPage((prevState) => prevState + 1);
    }

    return (
        <ContentWidthContainer>
            <HeaderContainer>
                <Navbar />
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

                    <InfiniteScroll
                        elements={popularCollections}
                        loadMoreElements={loadMoreCollections}
                        elementsFinished={collectionsFinished}
                        template={<CollectionCard />}
                    />
                </SectionGrid>
            </MainContainer>

            <FooterContainer>
                <CopyRight />
            </FooterContainer>
        </ContentWidthContainer>
    );
}

export default Collections;
