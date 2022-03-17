import "../styles/GoogleSignIn.scss";

function GoogleSignIn() {
    function handleClickOnSignInBtn() {
        let url = "/api/auth/google";
        if (process.env.NODE_ENV === "development") {
            url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}` + url;
        }

        window.open(url, "_self");
    }

    return (
        <div className="google-sign-in">
            <button
                className="google-sign-in__btn"
                onClick={handleClickOnSignInBtn}
            >
                Sign In With Google
            </button>
        </div>
    );
}

export default GoogleSignIn;
