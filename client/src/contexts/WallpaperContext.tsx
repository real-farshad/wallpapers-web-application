import { createContext, useContext, useState, useEffect } from "react";

const WallpaperContext = createContext(null as any);

function WallpaperProvider({ children }: any) {
    const [wallpaper, setWallpaper] = useState(null);
    const [wallpaperId, setWallpaperId] = useState(null);
    const [lastUrl, setLastUrl] = useState("");

    useEffect(() => {
        if (!wallpaperId) return setWallpaper(null);
        fetchAndSetWallpaper(wallpaperId);
    }, [wallpaperId]);

    async function fetchAndSetWallpaper(id: string) {
        const res = await fetch("/api/posts/" + id);
        const wallpaperObject = await res.json();
        setWallpaper(wallpaperObject);
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
                fetchAndSetWallpaper,
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
