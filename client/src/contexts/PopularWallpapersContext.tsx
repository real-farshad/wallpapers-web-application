import { createContext, useContext, useState } from "react";

const PopularWallpapersContext = createContext(null) as any;

export default function PopularWallpapersProvider({ children }: any) {
    const [popularWallpapers, setPopularWallpapers] = useState([]);

    async function getPopularPreviewWallpapers() {
        const res = await fetch("/api/posts/?sort=popular&limit=6");
        const wallpapers = await res.json();
        setPopularWallpapers(wallpapers);
    }

    async function get2020PopularWallpapers() {}

    async function get2021PopularWallpapers() {}

    async function getAllTimesPopularWallpapers() {}

    <PopularWallpapersContext.Provider
        value={{
            popularWallpapers,
        }}
    >
        {children}
    </PopularWallpapersContext.Provider>;
}

export function usePopularWallpapers() {
    return useContext(PopularWallpapersContext);
}
