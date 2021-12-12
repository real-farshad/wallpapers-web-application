import { Fragment, useCallback, useEffect, useState } from "react";
import WallpaperCard from "./WallpaperCard";

interface InfiniteScrollWallpapersTypes {
    wallpapers: object[];
    wallpapersFinished: boolean;
    loadWallpapers: () => void;
}

function InfiniteScrollWallpapers(props: InfiniteScrollWallpapersTypes) {
    const { wallpapers, wallpapersFinished, loadWallpapers } = props;

    const [reachedBottom, setReachedBottom] = useState(false);

    useEffect(() => {
        if (reachedBottom) {
            loadWallpapers();
            setReachedBottom(false);
        }
    }, [reachedBottom]);

    const lastWallpaperCardRef = useCallback((lastWallpaperCard) => {
        if (lastWallpaperCard !== null) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            observer.unobserve(lastWallpaperCard as any);
                            setReachedBottom(true);
                        }
                    });
                },
                { threshold: 0.7 }
            );
            observer.observe(lastWallpaperCard as any);
        }
    }, []);

    return (
        <Fragment>
            {wallpapers.length > 0 &&
                wallpapers.map((wallpaper: any, wallpaperIndex) => {
                    const isLastWallpaper = wallpaperIndex === wallpapers.length - 1;
                    const observe = isLastWallpaper && !wallpapersFinished;
                    return observe ? (
                        <div ref={lastWallpaperCardRef} key={wallpaper._id}>
                            <WallpaperCard data={wallpaper} />
                        </div>
                    ) : (
                        <div key={wallpaper._id}>
                            <WallpaperCard data={wallpaper} />
                        </div>
                    );
                })}
        </Fragment>
    );
}

export default InfiniteScrollWallpapers;
