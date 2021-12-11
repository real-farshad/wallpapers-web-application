import { Fragment } from "react";
import ContentContainer from "../components/ContentContainer";
import Navbar from "../components/Navbar";
import PopularWallpapers from "../components/PopularWallpapers";
import CopyRight from "../components/CopyRight";
import "../styles/Popular.scss";

function Popular() {
    return (
        <Fragment>
            <ContentContainer>
                <header>
                    <div className="popular__navbar">
                        <Navbar />
                    </div>
                </header>

                <main>
                    <div className="popular__wallpapers">
                        <PopularWallpapers />
                    </div>
                </main>

                <footer>
                    <div className="popular__copy-right">
                        <CopyRight />
                    </div>
                </footer>
            </ContentContainer>
        </Fragment>
    );
}

export default Popular;
