import SectionTitle from "./SectionTitle";
import LocalSignIn from "./LocalSignIn";
import GoogleSignIn from "./GoogleSignIn";
import "../styles/SignIn.scss";

function SignIn() {
    return (
        <div className="sign-in">
            <div>
                <div className="sign-in__title">
                    <SectionTitle>
                        SIGN INTO <br className="sign-in__title-break" />
                        YOUR ACCOUNT
                    </SectionTitle>
                </div>

                <p className="sign-in__title-description">
                    And Enjoy Your Stay
                </p>
            </div>

            <div className="sign-in__options-container">
                <p className="sign-in__description">
                    You can use your email and password to sign into your
                    account or you cant sign in with your google account.
                </p>

                <div className="sign-in__local">
                    <LocalSignIn />
                </div>

                <div>
                    <GoogleSignIn />
                </div>
            </div>
        </div>
    );
}

export default SignIn;
