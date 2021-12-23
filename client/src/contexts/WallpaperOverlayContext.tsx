import { createContext, useContext, useState } from "react";

const WallpaperOverlayContext = createContext(null as any);

function WallpaperOverlayProvider({ children }: any) {
    const [wallpaperId, setWallpaperId] = useState(null);
    const [lastUrl, setLastUrl] = useState("");

    return (
        <WallpaperOverlayContext.Provider
            value={{
                wallpaperId,
                lastUrl,
                setWallpaperId,
                setLastUrl,
            }}
        >
            {children}
        </WallpaperOverlayContext.Provider>
    );
}

function useWallpaperOverlayContext() {
    return useContext(WallpaperOverlayContext);
}

export default WallpaperOverlayProvider;
export { useWallpaperOverlayContext };
