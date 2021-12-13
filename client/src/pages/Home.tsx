import { Fragment } from "react";
import Navbar from "../components/Navbar";
import ContentContainer from "../components/ContentContainer";
import PopularPreview from "../components/PopularPreview";
import CoverImage from "../components/CoverImage";
import homepageBackground from "../assets/homepage-background.jpg";
import NewPreview from "../components/NewPreview";
import CollectionsPreview from "../components/CollectionsPreview";
import CopyRight from "../components/CopyRight";
import "../styles/Home.scss";

function Home() {
    return (
        <Fragment>
            <div className="home__background">
                <CoverImage src={homepageBackground} />
            </div>

            <ContentContainer>
                <header>
                    <div className="home__navbar">
                        <Navbar />
                    </div>
                </header>

                <main>
                    <div className="home__content-section">
                        <PopularPreview />
                    </div>

                    <div className="home__content-section">
                        <NewPreview />
                    </div>

                    <div className="home__content-section">
                        <CollectionsPreview />
                    </div>
                </main>

                <footer>
                    <div className="home__copy-right">
                        <CopyRight />
                    </div>
                </footer>
            </ContentContainer>
        </Fragment>
    );
}

export default Home;
