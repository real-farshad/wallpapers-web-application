import { useEffect, useState } from "react";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import Navbar from "../components/Navbar";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import ControlBtnsContainer from "../components/ControlBtnsContainer";
import ControlBtn from "../components/ControlBtn";
import SectionTitle from "../components/SectionTitle";
import InfiniteScroll from "../components/InfiniteScroll";
import WallpaperCard from "../components/WallpaperCard";
import CollectionCard from "../components/CollectionCard";
import FooterContainer from "../components/FooterContainer";
import CopyRight from "../components/CopyRight";
import "../styles/Search.scss";

function Search() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { selection, text } = params;

    const [results, setResults] = useState([]);
    const [resultsFinished, setResultsFinished] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const textString = text ? JSON.stringify(text) : "";
        const searchTextTooShort = textString.length < 3;
        const searchTextTooLong = textString.length > 64;
        if (searchTextTooShort || searchTextTooLong) return;

        (async () => {
            const res = await fetch(
                `/api/${
                    selection === "collections" ? "collections" : "posts"
                }/?search=${textString}&sort=${
                    selection === "new" ? "new" : "popular"
                }&limit=8`
            );
            const searchResults = await res.json();
            setResults(searchResults);
        })();
    }, []);

    async function loadMoreResults() {
        const res = await fetch(
            `/api/${
                selection === "collections" ? "collections" : "posts"
            }/?search=${text}&sort=${selection === "new" ? "new" : "popular"}&page=${
                page + 1
            }&limit=8`
        );
        const results = await res.json();

        setResults((prevState) => [...prevState, ...(results as never[])]);
        if (results.length < 8) setResultsFinished(true);
        setPage((prevState) => prevState + 1);
    }

    function handleClickOnPopularSelection() {
        if (selection === "popular") return;
        window.location.href = `/search?selection=popular&text=${text}`;
    }

    function handleClickOnNewSelection() {
        if (selection === "new") return;
        window.location.href = `/search?selection=new&text=${text}`;
    }

    function handleClickOnCollectionsSelection() {
        if (selection === "collections") return;
        window.location.href = `/search?selection=collections&text=${text}`;
    }

    return (
        <ContentWidthContainer>
            <div className="search">
                <HeaderContainer>
                    <Navbar />
                </HeaderContainer>

                <div className="search__container">
                    <div className="search__result-section">
                        <SectionGrid>
                            <SectionInfoContainer twoRows>
                                <ControlBtnsContainer>
                                    <div onClick={handleClickOnPopularSelection}>
                                        <ControlBtn
                                            active={!selection || selection === "popular"}
                                        >
                                            Popular First
                                        </ControlBtn>
                                    </div>

                                    <div onClick={handleClickOnNewSelection}>
                                        <ControlBtn active={selection === "new"}>
                                            New First
                                        </ControlBtn>
                                    </div>

                                    <div onClick={handleClickOnCollectionsSelection}>
                                        <ControlBtn active={selection === "collections"}>
                                            Collections
                                        </ControlBtn>
                                    </div>
                                </ControlBtnsContainer>

                                <SectionTitle>
                                    {results.length} <br />
                                    MATCHING <br />
                                    {selection === "collections"
                                        ? `COLLECTION${results.length > 1 ? "S" : ""}`
                                        : `WALLPAPER${results.length > 1 ? "S" : ""}`}
                                </SectionTitle>
                            </SectionInfoContainer>

                            <InfiniteScroll
                                elements={results}
                                loadMoreElements={loadMoreResults}
                                elementsFinished={resultsFinished}
                                template={
                                    selection === "collections" ? (
                                        <CollectionCard />
                                    ) : (
                                        <WallpaperCard />
                                    )
                                }
                            />
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
