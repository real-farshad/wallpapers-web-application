import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import searchCollections from "../api/searchCollections";
import searchWallpapers from "../api/searchWallpapers";
import ContentWidthContainer from "../components/ContentWidthContainer";
import HeaderContainer from "../components/HeaderContainer";
import StandardNavbar from "../components/StandardNavbar";
import SectionGrid from "../components/SectionGrid";
import SectionInfoContainer from "../components/SectionInfoContainer";
import ControlBtnsContainer from "../components/ControlBtnsContainer";
import ControlBtn from "../components/ControlBtn";
import SectionTitle from "../components/SectionTitle";
import WallpapersInfiniteScroll from "../components/wallpapersInfiniteScroll";
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
    const resultsLimit = 8;

    const [results, setResults] = useState([]);
    const [resultsFinished, setResultsFinished] = useState(false);

    useEffect(() => {
        search();
    }, [searchParams]);

    function handleClickOnControlBtn(newContentType: string, newSort?: string) {
        setPage(1);
        setResults([]);
        setResultsFinished(false);

        let url = `/search/${newContentType}?title=${title}`;
        if (newContentType === "wallpapers") url += `&sort=${newSort}`;
        navigate(url);
    }

    async function search() {
        let searchResults: never[];
        if (contentType === "collections") {
            searchResults = await searchCollections({
                title,
                page,
                limit: resultsLimit,
            });
        } else {
            const wallpapersSort = sort === "new" ? "new" : "popular";
            searchResults = await searchWallpapers({
                title,
                sort: wallpapersSort,
                page,
                limit: resultsLimit,
            });
        }

        setResults((prevState) => [...prevState, ...searchResults]);
        if (searchResults.length < resultsLimit) setResultsFinished(true);
        setPage((prevState) => prevState + 1);
    }

    if (page === 1) return null;

    const controlBtns = (
        <ControlBtnsContainer>
            <div
                onClick={() => handleClickOnControlBtn("wallpapers", "popular")}
            >
                <ControlBtn active={sort === "popular"}>
                    Popular First
                </ControlBtn>
            </div>

            <div onClick={() => handleClickOnControlBtn("wallpapers", "new")}>
                <ControlBtn active={sort === "new"}>New First</ControlBtn>
            </div>

            <div onClick={() => handleClickOnControlBtn("collections")}>
                <ControlBtn active={contentType === "collections"}>
                    Collections
                </ControlBtn>
            </div>
        </ControlBtnsContainer>
    );

    const sectionTitle = (
        <SectionTitle>
            {results.length} <br />
            MATCHING <br />
            {contentType === "collections"
                ? `COLLECTION${results.length > 1 ? "S" : ""}`
                : `WALLPAPER${results.length > 1 ? "S" : ""}`}
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

                            <WallpapersInfiniteScroll
                                wallpapers={results}
                                loadMoreWallpapers={search}
                                wallpapersFinished={resultsFinished}
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
