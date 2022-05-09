import { useUserContext } from "../contexts/UserContext";
import Navbar from "./Navbar";
import UserNavBtn from "./UserNav";
import AuthNavigation from "./AuthNavigation";

function StandardNavbar() {
    const { isSignedIn } = useUserContext();
    return <Navbar>{isSignedIn ? <UserNavBtn /> : <AuthNavigation />}</Navbar>;
}

export default StandardNavbar;
