import "../styles/GoogleSignIn.scss";

function GoogleSignIn() {
    function handleClickOnSignInBtn() {
        window.open("http://localhost:5000/api/auth/google", "_self");
    }

    return (
        <div className="google-sign-in">
            <button className="google-sign-in__btn" onClick={handleClickOnSignInBtn}>
                Sign In With Google
            </button>
        </div>
    );
}

export default GoogleSignIn;
