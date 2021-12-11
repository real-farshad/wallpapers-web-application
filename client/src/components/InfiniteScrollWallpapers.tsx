import { useCallback } from "react";
import WallpaperCard from "./WallpaperCard";
import "../styles/InfiniteScrollWallpapers.scss";

interface InfiniteScrollWallpapersTypes {
    wallpapers: object[];
    wallpapersFinished: boolean;
    loadWallpapers: () => void;
    children: any;
}

function InfiniteScrollWallpapers(props: InfiniteScrollWallpapersTypes) {
    const { wallpapers, wallpapersFinished, loadWallpapers, children } = props;

    const lastWallpaperCardRef = useCallback((lastWallpaperCard) => {
        if (lastWallpaperCard !== null) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            observer.unobserve(lastWallpaperCard as any);
                            loadWallpapers();
                        }
                    });
                },
                { threshold: 0.7 }
            );
            observer.observe(lastWallpaperCard as any);
        }
    }, []);

    return (
        <div className="infinite-scroll-wallpapers">
            {children}

            {wallpapers.length > 0 &&
                wallpapers.map((wallpaper: any, wallpaperIndex) => {
                    const isLastWallpaper = wallpaperIndex === wallpapers.length - 1;
                    const observe = isLastWallpaper && !wallpapersFinished;
                    return observe ? (
                        <div
                            className="infinite-scroll-wallpapers__card"
                            ref={lastWallpaperCardRef}
                            key={wallpaper._id}
                        >
                            <WallpaperCard data={wallpaper} />
                        </div>
                    ) : (
                        <div
                            className="infinite-scroll-wallpapers__card"
                            key={wallpaper._id}
                        >
                            <WallpaperCard data={wallpaper} />
                        </div>
                    );
                })}
        </div>
    );
}

export default InfiniteScrollWallpapers;
