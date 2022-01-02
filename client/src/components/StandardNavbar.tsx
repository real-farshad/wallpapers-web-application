import Navbar from "./Navbar";
import AuthNavigation from "./AuthNavigation";

function StandardNavbar() {
    return (
        <Navbar>
            <AuthNavigation signInActive={true} signUpActive={true} />
        </Navbar>
    );
}

export default StandardNavbar;
