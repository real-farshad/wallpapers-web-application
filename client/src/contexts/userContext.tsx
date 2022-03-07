import { createContext, useContext, useEffect, useState } from "react";
import checkUserSignedIn from "../api/checkUserSignedIn";

const UserContext = createContext(null as any);

function UserProvider({ children }: any) {
    const [user, setUser] = useState(null as null | object);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        const user = await checkUserSignedIn();

        if (!user) return;

        setUser(user);
        setIsLoggedIn(true);
    }

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn,
                checkAuth,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

function useUserContext() {
    return useContext(UserContext);
}

export default UserProvider;
export { useUserContext };
