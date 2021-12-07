import { Fragment } from "react";
import Navbar from "../components/Navbar";
import ContentContainer from "../components/ContentContainer";

function Home() {
    return (
        <Fragment>
            <ContentContainer>
                <header>
                    <Navbar />
                </header>
            </ContentContainer>
        </Fragment>
    );
}

export default Home;
