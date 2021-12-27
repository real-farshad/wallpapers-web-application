import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
    const [searchParams, setSearchParams] = useSearchParams();

    const selection = searchParams.get("selection");
    const title: any = searchParams.get("title");

    const [results, setResults] = useState([]);
    const [resultsFinished, setResultsFinished] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!title || title.length < 3 || title.length > 64) return;

        (async () => {
            const url = `/api/${
                selection === "collections" ? "collections" : "posts"
            }/?search=${title}&sort=${selection === "new" ? "new" : "popular"}&limit=8`;

            const res = await fetch(url);
            const searchResults = await res.json();

            setResults(searchResults);
            setPage((prevState) => prevState + 1);
        })();
    }, [searchParams]);

    async function loadMoreResults() {
        const url = `/api/${
            selection === "collections" ? "collections" : "posts"
        }/?search=${title}&sort=${
            selection === "new" ? "new" : "popular"
        }&page=${page}&limit=8`;

        const res = await fetch(url);
        const results: never[] = await res.json();

        setResults((prevState) => [...prevState, ...results]);
        if (results.length < 8) setResultsFinished(true);
        setPage((prevState) => prevState + 1);
    }

    function handleClickOnControlBtn(type: string) {
        if (selection === type) return;
        setSearchParams({ title, selection: type });
        setPage(1);
    }

    if (page === 1) return null;

    return (
        <ContentWidthContainer>
            <div className="search">
                <HeaderContainer>
                    <Navbar />
                </HeaderContainer>

                <div className="search__container">
                    <div className="search__result-section">
                        <SectionGrid>
                            <SectionInfoContainer controls>
                                <ControlBtnsContainer>
                                    <div
                                        onClick={() => handleClickOnControlBtn("popular")}
                                    >
                                        <ControlBtn
                                            active={!selection || selection === "popular"}
                                        >
                                            Popular First
                                        </ControlBtn>
                                    </div>

                                    <div onClick={() => handleClickOnControlBtn("new")}>
                                        <ControlBtn active={selection === "new"}>
                                            New First
                                        </ControlBtn>
                                    </div>

                                    <div
                                        onClick={() =>
                                            handleClickOnControlBtn("collections")
                                        }
                                    >
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
