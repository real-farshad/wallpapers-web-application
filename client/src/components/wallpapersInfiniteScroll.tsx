import { Fragment } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import WallpaperCard from "./WallpaperCard";

interface WallpapersInfiniteScrollTypes {
    wallpapers: {
        _id: string;
    }[];
    wallpapersFinished: boolean;
    loadMoreWallpapers: () => void;
}

function WallpapersInfiniteScroll(props: WallpapersInfiniteScrollTypes) {
    const { wallpapers, wallpapersFinished, loadMoreWallpapers } = props;

    const setLastWallpaper: any = useInfiniteScroll(
        wallpapersFinished,
        loadMoreWallpapers
    );

    return (
        <Fragment>
            {wallpapers.length > 0 &&
                wallpapers.map((wallpaper, index) => {
                    const isLastWallpaper = index === wallpapers.length - 1;
                    if (isLastWallpaper) {
                        return (
                            <div ref={setLastWallpaper} key={wallpaper._id}>
                                <WallpaperCard data={wallpaper} />
                            </div>
                        );
                    } else {
                        return (
                            <WallpaperCard
                                data={wallpaper}
                                key={wallpaper._id}
                            />
                        );
                    }
                })}
        </Fragment>
    );
}

export default WallpapersInfiniteScroll;
