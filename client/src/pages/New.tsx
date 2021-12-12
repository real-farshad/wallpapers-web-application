import ContentContainer from "../components/ContentContainer";
import Navbar from "../components/Navbar";
import NewWallpapers from "../components/NewWallpapers";
import CopyRight from "../components/CopyRight";
import "../styles/New.scss";

function New() {
    return (
        <ContentContainer>
            <header>
                <div className="new__navbar">
                    <Navbar />
                </div>
            </header>

            <main>
                <div className="new__wallpapers">
                    <NewWallpapers />
                </div>
            </main>

            <footer>
                <div className="new__copy-right">
                    <CopyRight />
                </div>
            </footer>
        </ContentContainer>
    );
}

export default New;
