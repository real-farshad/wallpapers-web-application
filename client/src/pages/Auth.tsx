import authBg from "../assets/auth-bg.jpg";
import ContentWidthContainer from "../components/ContentWidthContainer";
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import "../styles/Auth.scss";

function Auth() {
    return (
        <div className="auth">
            <div className="auth__background">
                <div
                    className="auth__background-image"
                    style={{ backgroundImage: `url(${authBg})` }}
                />

                <div className="auth__background-overlay" />
            </div>

            <ContentWidthContainer>
                <div className="auth__container">
                    <header className="auth__header">
                        <div className="auth__navbar">
                            <Navbar />
                        </div>
                    </header>

                    <main className="auth__main">
                        <div className="auth__sign-up">
                            <SignUp />
                        </div>

                        {/* <div className="auth__sign-up"></div> */}
                    </main>
                </div>
            </ContentWidthContainer>
        </div>
    );
}

export default Auth;
