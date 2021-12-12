import ContentContainer from "../components/ContentContainer";
import Navbar from "../components/Navbar";
import PopularCollections from "../components/PopularCollections";
import CopyRight from "../components/CopyRight";
import "../styles/Collections.scss";

function Collections() {
    return (
        <ContentContainer>
            <header>
                <div className="collections__navbar">
                    <Navbar />
                </div>
            </header>

            <main>
                <div className="collections__popular">
                    <PopularCollections />
                </div>
            </main>

            <footer>
                <div className="collections__copy-right">
                    <CopyRight />
                </div>
            </footer>
        </ContentContainer>
    );
}

export default Collections;
