import "../styles/GoogleSignUp.scss";

function GoogleSignUp() {
    function handleClickOnSignUpBtn() {
        window.open("http://localhost:5000/api/auth/google", "_self");
    }

    return (
        <div className="google-sign-up">
            <h1 className="google-sign-up__title">
                Sign Up With <br className="google-sign-up__title-break" />
                Your Google Account
            </h1>

            <p className="google-sign-up__description">
                We recommend using this method, when you sign up with your
                google account, you don't need to worry about forgetting your
                password and you can sign in much faster and easier.
            </p>

            <button
                className="google-sing-up__btn"
                onClick={handleClickOnSignUpBtn}
            >
                Sign Up With Google
            </button>
        </div>
    );
}

export default GoogleSignUp;
