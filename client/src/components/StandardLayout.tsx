import ContentWidthContainer from "./ContentWidthContainer";
import Navbar from "./Navbar";
import CopyRight from "./CopyRight";
import "../styles/StandardLayout.scss";

function StandardLayout({ children }: any) {
    return (
        <ContentWidthContainer>
            <header>
                <div className="standard-layout__navbar">
                    <Navbar />
                </div>
            </header>

            <main>
                <div className="standard-layout__content">{children}</div>
            </main>

            <footer>
                <div className="standard-layout__copy-right">
                    <CopyRight />
                </div>
            </footer>
        </ContentWidthContainer>
    );
}

export default StandardLayout;
