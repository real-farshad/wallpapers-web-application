import { useUserContext } from "../contexts/userContext";
import Navbar from "./Navbar";
import UserNavBtn from "./UserNav";
import AuthNavigation from "./AuthNavigation";

function StandardNavbar() {
    const { isLoggedIn } = useUserContext();
    return <Navbar>{isLoggedIn ? <UserNavBtn /> : <AuthNavigation />}</Navbar>;
}

export default StandardNavbar;
