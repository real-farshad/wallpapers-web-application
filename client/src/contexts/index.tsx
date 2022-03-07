import WallpaperProvider from "./WallpaperContext";
import UserProvider from "./userContext";

export default function AppProvider({ children }: any) {
    return (
        <UserProvider>
            <WallpaperProvider>{children}</WallpaperProvider>
        </UserProvider>
    );
}
