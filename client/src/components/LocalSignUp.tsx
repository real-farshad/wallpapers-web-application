import "../styles/LocalSignUp.scss";

function LocalSignUp() {
    return (
        <div className="local-sign-up">
            <h1 className="local-sign-up__title">
                Sign Up <br className="local-sign-up__md-title-break" />
                With Your <br className="local-sign-up__sm-title-break" />
                Email
            </h1>

            <form className="local-sign-up__form">
                <input
                    className="local-sign-up__input"
                    type="text"
                    placeholder="Username*"
                />

                <input
                    className="local-sign-up__input"
                    type="email"
                    placeholder="Email*"
                />

                <input
                    className="local-sign-up__input"
                    type="password"
                    placeholder="Password*"
                />

                <button className="local-sign-up__btn" type="submit">
                    Create A New Account
                </button>
            </form>
        </div>
    );
}

export default LocalSignUp;
