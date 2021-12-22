import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WallpaperLayout from "../components/WallpaperLayout";
import WallpaperContent from "../components/WallpaperContent";
import "../styles/WallpaperOverlay.scss";

interface WallpaperOverlayTypes {
    wallpaperId: string;
    lastUrl: string;
    removeWallpaperId: () => void;
    changeLastUrl: (url: string) => void;
}

function WallpaperOverlay(props: WallpaperOverlayTypes) {
    const { wallpaperId, lastUrl, removeWallpaperId, changeLastUrl } = props;

    const [data, setData] = useState(null as any);

    useEffect(() => {
        if (wallpaperId) {
            (async () => {
                (async () => {
                    const res = await fetch("/api/posts/" + wallpaperId);
                    if (res.status !== 200) return;
                    const wallpaper = await res.json();
                    setData(wallpaper);
                })();
            })();
        }
    }, []);

    useEffect(() => {
        if (data) {
            changeLastUrl(window.location.href);
            window.history.pushState("", "", "/single/" + wallpaperId);
        }
    }, [data]);

    function handleClickOnGoBackBtn() {
        window.history.pushState("", "", lastUrl);
        removeWallpaperId();
    }

    if (!data) return null;

    return (
        <div className="wallpaper-overlay">
            <WallpaperLayout backgroundImage={data.imageUrl.large}>
                <div className="wallpaper-overlay__navbar">
                    <button
                        className="wallpaper-overlay__go-back-btn"
                        onClick={handleClickOnGoBackBtn}
                    >
                        Go Back
                    </button>
                </div>

                <WallpaperContent data={data as any} />
            </WallpaperLayout>
        </div>
    );
}

export default WallpaperOverlay;
