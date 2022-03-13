import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import countMatchingWallpapers from "../api/countMatchingWallpapers";
import searchWallpapers from "../api/searchWallpapers";
import countMatchingCollections from "../api/countMatchingCollections";
import searchCollections from "../api/searchCollections";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import StandardNavbar from "../components/StandardNavbar";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import ControlBtnsContainer from "../components/ControlBtnsContainer";
import ControlBtn from "../components/ControlBtn";
import SectionTitle from "../components/SectionTitle";
import WallpapersInfiniteScroll from "../components/WallpapersInfiniteScroll";
import CollectionsInfiniteScroll from "../components/CollectionsInfiniteScroll";
import FooterContainer from "../components/FooterContainer";
import CopyRight from "../components/CopyRight";
import "../styles/Search.scss";

function Search() {
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams] = useSearchParams();

    const contentType = params.contentType;
    const title = searchParams.get("title");
    const sort = searchParams.get("sort");
    const [page, setPage] = useState(1);
    const limit = 8;

    const [matchingResultsCount, setMatchingResultsCount] = useState(0);
    const [results, setResults] = useState([]);
    const [resultsFinished, setResultsFinished] = useState(false);

    useEffect(() => {
        if (page === 1 && !resultsFinished) {
            if (contentType === "wallpapers") {
                addMatchingWallpapersCount();
                addSearchedWallpapers();
            } else {
                addMatchingCollectionsCount();
                addSearchedCollections();
            }
        }
    }, [results]);

    useEffect(() => {
        if (page !== 1 && !resultsFinished) {
            if (contentType === "wallpapers") addSearchedWallpapers();
            else addSearchedCollections();
        }
    }, [page]);

    async function addMatchingWallpapersCount() {
        const count = await countMatchingWallpapers({
            title: title ? title : "",
        });

        setMatchingResultsCount(count);
    }

    async function addSearchedWallpapers() {
        const wallpapersSort = sort === "new" ? "new" : "popular";
        const relatedWallpapers: never[] = await searchWallpapers({
            title: title ? title : "",
            sort: wallpapersSort,
            page,
            limit,
        });

        if (relatedWallpapers.length < limit) setResultsFinished(true);
        setResults((prevResults) => [...prevResults, ...relatedWallpapers]);
    }

    async function addMatchingCollectionsCount() {
        const count = await countMatchingCollections({
            title: title ? title : "",
        });

        setMatchingResultsCount(count);
    }

    async function addSearchedCollections() {
        const relatedCollections: never[] = await searchCollections({
            title: title as string,
            page,
            limit,
        });

        if (relatedCollections.length < limit) setResultsFinished(true);
        setResults((prevResults) => [...prevResults, ...relatedCollections]);
    }

    function changeQuery(newContentType: string, newSort?: string) {
        setPage(1);
        setMatchingResultsCount(0);
        setResults([]);
        setResultsFinished(false);

        let url = `/search/${newContentType}?title=${title}`;
        if (newContentType === "wallpapers") url += `&sort=${newSort}`;
        navigate(url);
    }

    const controlBtns = (
        <ControlBtnsContainer>
            <div onClick={() => changeQuery("wallpapers", "popular")}>
                <ControlBtn
                    active={
                        (contentType === "wallpapers" && !sort) ||
                        sort === "popular"
                    }
                >
                    Popular First
                </ControlBtn>
            </div>

            <div onClick={() => changeQuery("wallpapers", "new")}>
                <ControlBtn active={sort === "new"}>New First</ControlBtn>
            </div>

            <div onClick={() => changeQuery("collections")}>
                <ControlBtn active={contentType === "collections"}>
                    Collections
                </ControlBtn>
            </div>
        </ControlBtnsContainer>
    );

    const sectionTitle =
        contentType === "wallpapers" ? (
            <SectionTitle>
                {matchingResultsCount} <br />
                MATCHING <br />
                WALLPAPER{results.length > 1 ? "S" : ""}
            </SectionTitle>
        ) : (
            <SectionTitle>
                {results.length} <br />
                MATCHING <br />
                COLLECTION{results.length > 1 ? "S" : ""}
            </SectionTitle>
        );

    return (
        <ContentWidthContainer>
            <div className="search">
                <HeaderContainer>
                    <StandardNavbar />
                </HeaderContainer>

                <div className="search__container">
                    <div className="search__result-section">
                        <SectionGrid>
                            <SectionInfoContainer controls>
                                {controlBtns}

                                {sectionTitle}
                            </SectionInfoContainer>

                            {contentType === "wallpapers" ? (
                                <WallpapersInfiniteScroll
                                    wallpapers={results}
                                    wallpapersFinished={resultsFinished}
                                    setPage={setPage}
                                />
                            ) : (
                                <CollectionsInfiniteScroll
                                    collections={results}
                                    collectionsFinished={resultsFinished}
                                    setPage={setPage}
                                />
                            )}
                        </SectionGrid>
                    </div>

                    <FooterContainer>
                        <CopyRight />
                    </FooterContainer>
                </div>
            </div>
        </ContentWidthContainer>
    );
}

export default Search;
