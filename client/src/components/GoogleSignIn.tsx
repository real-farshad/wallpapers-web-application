import "../styles/GoogleSignIn.scss";

function GoogleSignIn() {
  function handleClickOnSignInBtn() {
    const baseURL = process.env.REACT_APP_SERVER_URL;
    let url = `${baseURL}/api/auth/google`;
    window.open(url, "_self");
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
