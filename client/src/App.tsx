import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import New from "./pages/New";
import Collections from "./pages/Collections";
import Search from "./pages/Search";
import Wallpaper from "./pages/Wallpaper";
import WallpaperOverlay from "./components/WallpaperOverlay";
import "./styles/App.scss";

function App() {
    const [lastUrl, setLastUrl] = useState("");
    const [wallpaperId, setWallpaperId] = useState(null) as any;

    function addWallpaperId(id: string) {
        setWallpaperId(id);
    }

    function removeWallpaperId() {
        setWallpaperId(null);
    }

    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<Home addWallpaperId={addWallpaperId} />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/new" element={<New />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/search" element={<Search />} />
                <Route path="/single/:id" element={<Wallpaper />} />
            </Routes>

            {wallpaperId && (
                <WallpaperOverlay
                    wallpaperId={wallpaperId}
                    lastUrl={lastUrl}
                    removeWallpaperId={removeWallpaperId}
                    changeLastUrl={(url: string) => setLastUrl(url)}
                />
            )}
        </Fragment>
    );
}

export default App;
