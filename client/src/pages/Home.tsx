import { Fragment, useEffect, useState } from "react";
import { useLoadingContext } from "../contexts/loadingContext";
import searchWallpapers from "../api/searchWallpapers";
import searchCollections from "../api/searchCollections";
import ContentWidthContainer from "../components/ContentWidthContainer";
import homepageBackground from "../assets/homepage-background.jpg";
import CoverImage from "../components/CoverImage";
import StandardNavbar from "../components/StandardNavbar";
import MainContainer from "../components/MainContainer";
import PopularPreview from "../components/PopularPreview";
import NewPreview from "../components/NewPreview";
import CollectionsPreview from "../components/CollectionsPreview";
import CopyRight from "../components/CopyRight";
import FooterContainer from "../components/FooterContainer";
import "../styles/Home.scss";

function Home() {
    const { startLoading, finishLoading } = useLoadingContext();

    const [popularWallpapers, setPopularWallpapers] = useState([]);
    const [newWallpapers, setNewWallpapers] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        startLoading();

        addPopularWallpapers();
        addNewWallpapers();
        addNewCollections();

        finishLoading();
    }, []);

    async function addPopularWallpapers() {
        const wallpapers = await searchWallpapers({
            sort: "popular",
            page: 1,
            limit: 6,
        });

        setPopularWallpapers(wallpapers);
    }

    async function addNewWallpapers() {
        const wallpapers = await searchWallpapers({
            sort: "new",
            page: 1,
            limit: 6,
        });

        setNewWallpapers(wallpapers);
    }

    async function addNewCollections() {
        const collections = await searchCollections({ page: 1, limit: 6 });
        setCollections(collections);
    }

    return (
        <Fragment>
            <div className="home__background">
                <CoverImage src={homepageBackground} />
            </div>

            <ContentWidthContainer>
                <header>
                    <div className="home__navbar">
                        <StandardNavbar />
                    </div>
                </header>

                <MainContainer>
                    <div className="home__content-section">
                        <PopularPreview wallpapers={popularWallpapers} />
                    </div>

                    <div className="home__content-section">
                        <NewPreview wallpapers={newWallpapers} />
                    </div>

                    <CollectionsPreview collections={collections} />
                </MainContainer>

                <FooterContainer>
                    <CopyRight />
                </FooterContainer>
            </ContentWidthContainer>
        </Fragment>
    );
}

export default Home;
