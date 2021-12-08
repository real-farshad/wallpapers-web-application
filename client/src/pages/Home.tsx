import { Fragment } from "react";
import Navbar from "../components/Navbar";
import ContentContainer from "../components/ContentContainer";
import "../styles/Home.scss";
import PopularPreview from "../components/PopularPreview";
import CoverImage from "../components/CoverImage";
import homepageBackground from "../assets/homepage-background.jpg";

function Home() {
    return (
        <Fragment>
            <div className="homepage__background">
                <CoverImage src={homepageBackground} />
            </div>

            <ContentContainer>
                <header>
                    <div className="home__navbar">
                        <Navbar />
                    </div>
                </header>

                <main>
                    <PopularPreview />
                </main>
            </ContentContainer>
        </Fragment>
    );
}

export default Home;
