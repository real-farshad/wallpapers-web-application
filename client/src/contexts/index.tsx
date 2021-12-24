import WallpaperProvider from "./WallpaperContext";

export default function AppProvider({ children }: any) {
    return <WallpaperProvider>{children}</WallpaperProvider>;
}
