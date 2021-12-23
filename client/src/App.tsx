import { Fragment } from "react";
import { useWallpaperOverlayContext } from "./contexts/WallpaperOverlayContext";
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
    const { wallpaperId } = useWallpaperOverlayContext();

    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/new" element={<New />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/search" element={<Search />} />
                <Route path="/single/:id" element={<Wallpaper />} />
            </Routes>

            {wallpaperId && <WallpaperOverlay />}
        </Fragment>
    );
}

export default App;
