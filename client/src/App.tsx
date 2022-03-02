import { Fragment } from "react";
import { useWallpaperContext } from "./contexts/WallpaperContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import New from "./pages/New";
import Collections from "./pages/Collections";
import Search from "./pages/Search";
import Auth from "./pages/Auth";
import Wallpaper from "./pages/Wallpaper";
import Collection from "./pages/Collection";
import WallpaperOverlay from "./components/WallpaperOverlay";
import "./styles/App.scss";

function App() {
    const { wallpaperId } = useWallpaperContext();

    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/new" element={<New />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/search/:contentType" element={<Search />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                    path="/auth/sign-up"
                    element={<Auth option="sign-up" />}
                />
                <Route
                    path="/auth/sign-in"
                    element={<Auth option="sign-in" />}
                />
                <Route path="/wallpaper/:id" element={<Wallpaper />} />
                <Route path="/collection/:id" element={<Collection />} />
            </Routes>

            {wallpaperId && <WallpaperOverlay />}
        </Fragment>
    );
}

export default App;
