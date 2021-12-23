import { useState, useEffect } from "react";
import { useWallpaperOverlayContext } from "../contexts/WallpaperOverlayContext";
import WallpaperLayout from "../components/WallpaperLayout";
import WallpaperContent from "../components/WallpaperContent";
import "../styles/WallpaperOverlay.scss";

function WallpaperOverlay() {
    const { wallpaperId, lastUrl, setWallpaperId, setLastUrl } =
        useWallpaperOverlayContext();

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
            setLastUrl(window.location.href);
            window.history.pushState("", "", "/single/" + wallpaperId);
        }
    }, [data]);

    function handleClickOnGoBackBtn() {
        window.history.pushState("", "", lastUrl);
        setWallpaperId(null);
        setLastUrl("");
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
