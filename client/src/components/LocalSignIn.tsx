import "../styles/LocalSignIn.scss";

function LocalSignIn() {
    return (
        <div className="local-sign-in">
            <form className="local-sign-in__form">
                <input
                    className="local-sign-in__input"
                    type="email"
                    placeholder="Email*"
                />

                <input
                    className="local-sign-in__input"
                    type="password"
                    placeholder="Password*"
                />

                <button className="local-sign-in__btn" type="submit">
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default LocalSignIn;
