import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WallpaperLayout from "../components/WallpaperLayout";
import Navbar from "../components/Navbar";
import WallpaperContent from "../components/WallpaperContent";
import "../styles/Wallpaper.scss";

function Wallpaper() {
    const [data, setData] = useState(null as any);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            (async () => {
                const res = await fetch("/api/posts/" + id);
                if (res.status !== 200) window.location.href = "/";
                const wallpaper = await res.json();
                setData(wallpaper);
            })();
        })();
    }, []);

    if (!data) return null;

    return (
        <WallpaperLayout backgroundImage={data.imageUrl.large}>
            <header>
                <div className="wallpaper__navbar">
                    <Navbar />
                </div>
            </header>

            <main>
                <WallpaperContent data={data} />
            </main>
        </WallpaperLayout>
    );
}

export default Wallpaper;
