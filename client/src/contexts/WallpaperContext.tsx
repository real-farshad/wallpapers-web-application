import { createContext, useContext, useState, useEffect } from "react";
import findWallpaper from "../api/findWallpaper";

const WallpaperContext = createContext(null as any);

function WallpaperProvider({ children }: any) {
    const [wallpaper, setWallpaper] = useState(null);
    const [wallpaperId, setWallpaperId] = useState(null);
    const [lastUrl, setLastUrl] = useState("");

    useEffect(() => {
        if (!wallpaperId) return setWallpaper(null);
        addWallpaper(wallpaperId);
    }, [wallpaperId]);

    async function addWallpaper(id: string) {
        const relatedWallpaper = await findWallpaper(id);
        setWallpaper(relatedWallpaper);
    }

    return (
        <WallpaperContext.Provider
            value={{
                wallpaper,
                wallpaperId,
                lastUrl,
                setWallpaper,
                setWallpaperId,
                setLastUrl,
                addWallpaper,
            }}
        >
            {children}
        </WallpaperContext.Provider>
    );
}

function useWallpaperContext() {
    return useContext(WallpaperContext);
}

export default WallpaperProvider;
export { useWallpaperContext };
