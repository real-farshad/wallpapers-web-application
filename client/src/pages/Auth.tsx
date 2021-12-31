import authBg from "../assets/auth-bg.jpg";
import ContentWidthContainer from "../components/ContentWidthContainer";
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
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
                    <header>
                        <Navbar />
                    </header>

                    <main>
                        {/* <div className="auth__sign-up">
                            <SignUp />
                        </div> */}

                        <div className="auth__sign-in-container">
                            <div className="auth__sign-in">
                                <SignIn />
                            </div>
                        </div>
                    </main>
                </div>
            </ContentWidthContainer>
        </div>
    );
}

export default Auth;
