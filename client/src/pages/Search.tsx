import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import searchWallpapers from "../api/searchWallpapers";
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

    const [wallpapers, setWallpapers] = useState([]);
    const [wallpapersFinished, setWallpapersFinished] = useState(false);

    const [collections, setCollections] = useState([]);
    const [collectionsFinished, setCollectionsFinished] = useState(false);

    useEffect(() => {
        if (contentType === "wallpapers") {
            addSearchedWallpapers();
        } else {
            addSearchedCollections();
        }
    }, [searchParams, page]);

    async function addSearchedWallpapers() {
        const wallpapersSort = sort === "new" ? "new" : "popular";
        const relatedWallpapers: never[] = await searchWallpapers({
            title: title ? title : "",
            sort: wallpapersSort,
            page,
            limit,
        });

        setWallpapers((prevWallpapers) => [
            ...prevWallpapers,
            ...relatedWallpapers,
        ]);

        if (relatedWallpapers.length < limit) {
            setWallpapersFinished(true);
        }
    }

    async function addSearchedCollections() {
        const relatedCollections: never[] = await searchCollections({
            title: title as string,
            page,
            limit,
        });

        setCollections((prevCollections) => [
            ...prevCollections,
            ...relatedCollections,
        ]);

        if (relatedCollections.length < limit) {
            setCollectionsFinished(true);
        }
    }

    function changeQuery(newContentType: string, newSort?: string) {
        setPage(1);
        if (contentType === "wallpapers") {
            setWallpapers([]);
            setWallpapersFinished(false);
        } else {
            setCollections([]);
            setCollectionsFinished(false);
        }

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
                {wallpapers.length} <br />
                MATCHING <br />
                WALLPAPER{wallpapers.length > 1 ? "S" : ""}
            </SectionTitle>
        ) : (
            <SectionTitle>
                {collections.length} <br />
                MATCHING <br />
                COLLECTION{collections.length > 1 ? "S" : ""}
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
                                    wallpapers={wallpapers}
                                    wallpapersFinished={wallpapersFinished}
                                    setPage={setPage}
                                />
                            ) : (
                                <CollectionsInfiniteScroll
                                    collections={collections}
                                    collectionsFinished={collectionsFinished}
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
