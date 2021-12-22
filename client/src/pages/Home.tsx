import { Fragment } from "react";
import ContentWidthContainer from "../components/ContentWidthContainer";
import homepageBackground from "../assets/homepage-background.jpg";
import CoverImage from "../components/CoverImage";
import Navbar from "../components/Navbar";
import MainContainer from "../components/MainContainer";
import PopularPreview from "../components/PopularPreview";
import NewPreview from "../components/NewPreview";
import CollectionsPreview from "../components/CollectionsPreview";
import CopyRight from "../components/CopyRight";
import FooterContainer from "../components/FooterContainer";
import "../styles/Home.scss";

interface HomeTypes {
    addWallpaperId: (id: string) => void;
}

function Home({ addWallpaperId }: HomeTypes) {
    return (
        <Fragment>
            <div className="home__background">
                <CoverImage src={homepageBackground} />
            </div>

            <ContentWidthContainer>
                <header>
                    <div className="home__navbar">
                        <Navbar />
                    </div>
                </header>

                <MainContainer>
                    <div className="home__content-section">
                        <PopularPreview addWallpaperId={addWallpaperId} />
                    </div>

                    <div className="home__content-section">
                        <NewPreview />
                    </div>

                    <CollectionsPreview />
                </MainContainer>

                <FooterContainer>
                    <CopyRight />
                </FooterContainer>
            </ContentWidthContainer>
        </Fragment>
    );
}

export default Home;
