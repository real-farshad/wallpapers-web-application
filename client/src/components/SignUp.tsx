import GoogleSignUp from "./GoogleSignUp";
import SectionTitle from "./SectionTitle";
import LocalSignUp from "./LocalSignUp";
import "../styles/SignUp.scss";

function SignUp() {
    return (
        <div className="sign-up">
            <div>
                <div className="sign-up__title">
                    <SectionTitle>
                        BECOME <br className="sign-up__title-break" />
                        A PART OF <br className="sign-up__title-break" />
                        THE COMMUNITY <br className="sign-up__title-break" />
                    </SectionTitle>
                </div>

                <p className="sign-up__title-description">
                    Use More Features And Personalize Your Experience
                </p>
            </div>

            <div className="sign-up__options-container">
                <div className="sign-up__google-container">
                    <div className="sign-up__google">
                        <GoogleSignUp />
                    </div>
                </div>

                <div className="sign-up__local-form-container">
                    <div className="sign-up__local-form">
                        <LocalSignUp />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
