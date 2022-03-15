import { useEffect, useState } from "react";
import { useLoadingContext } from "../contexts/loadingContext";
import searchCollections from "../api/searchCollections";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import StandardNavbar from "../components/StandardNavbar";
import MainContainer from "../components/MainContainer";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import SectionTitle from "../components/SectionTitle";
import CollectionsInfiniteScroll from "../components/CollectionsInfiniteScroll";
import FooterContainer from "../components/FooterContainer";
import CopyRight from "../components/CopyRight";

function Collections() {
    const { startLoading, finishLoading } = useLoadingContext();

    const [page, setPage] = useState(1);
    const limit = 8;

    const [collections, setCollections] = useState([]);
    const [collectionsFinished, setCollectionsFinished] = useState(false);

    useEffect(() => {
        (async () => {
            startLoading();
            await addNewCollections();
            finishLoading();
        })();
    }, []);

    useEffect(() => {
        if (page !== 1) addNewCollections();
    }, [page]);

    async function addNewCollections() {
        const collections = await searchCollections({ page, limit });
        setCollections((prevState) => [
            ...prevState,
            ...(collections as never[]),
        ]);

        if (collections.length < limit) {
            setCollectionsFinished(true);
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
                            COLLECTIONS
                        </SectionTitle>
                    </SectionInfoContainer>

                    <CollectionsInfiniteScroll
                        collections={collections}
                        collectionsFinished={collectionsFinished}
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

export default Collections;
