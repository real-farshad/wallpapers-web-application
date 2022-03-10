import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./contexts/userContext";
import { useWallpaperContext } from "./contexts/WallpaperContext";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import New from "./pages/New";
import Collections from "./pages/Collections";
import Search from "./pages/Search";
import Auth from "./pages/Auth";
import Wallpaper from "./pages/Wallpaper";
import Collection from "./pages/Collection";
import WallpaperOverlay from "./components/WallpaperOverlay";
import Likes from "./pages/Likes";
import "./styles/App.scss";

function App() {
    const { isLoggedIn } = useUserContext();
    const { wallpaperId } = useWallpaperContext();

    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/new" element={<New />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/search/:contentType" element={<Search />} />
                <Route path="/auth" element={<Navigate to="/auth/sign-up" />} />
                <Route
                    path="/auth/:authOption"
                    element={isLoggedIn ? <Navigate to="/" /> : <Auth />}
                />
                <Route path="/wallpaper/:id" element={<Wallpaper />} />
                <Route path="/collections/:id" element={<Collection />} />
                <Route path="/user/likes" element={isLoggedIn && <Likes />} />
            </Routes>

            {wallpaperId && <WallpaperOverlay />}
        </Fragment>
    );
}

export default App;
