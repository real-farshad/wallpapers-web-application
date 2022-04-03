import { createContext, useContext, useEffect, useState } from "react";
import checkUserSignedIn from "../api/checkUserSignedIn";

const UserContext = createContext(null as any);

function UserProvider({ children }: any) {
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
    const [user, setUser] = useState(null as null | object);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        const user = await checkUserSignedIn();

        if (!user) return;

        setUser(user);
        setIsSignedIn(true);
        setHasCheckedAuth(true);
    }

    return (
        <UserContext.Provider
            value={{
                hasCheckedAuth,
                user,
                isSignedIn,
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
