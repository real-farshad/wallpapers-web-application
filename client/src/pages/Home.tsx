import { Fragment } from "react";
import Navbar from "../components/Navbar";
import ContentContainer from "../components/ContentContainer";
import "../styles/Home.scss";
import PopularPreview from "../components/PopularPreview";
import CoverImage from "../components/CoverImage";
import homepageBackground from "../assets/homepage-background.jpg";
import NewPreview from "../components/NewPreview";

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
                </main>
            </ContentContainer>
        </Fragment>
    );
}

export default Home;
