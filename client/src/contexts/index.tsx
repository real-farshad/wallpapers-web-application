import WallpaperOverlayProvider from "./WallpaperOverlayContext";

export default function AppProvider({ children }: any) {
    return <WallpaperOverlayProvider>{children}</WallpaperOverlayProvider>;
}
