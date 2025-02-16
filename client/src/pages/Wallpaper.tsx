/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLoadingContext } from "../contexts/LoadingContext";
import { useWallpaperContext } from "../contexts/WallpaperContext";
import { useParams } from "react-router-dom";
import WallpaperLayout from "../components/WallpaperLayout";
import StandardNavbar from "../components/StandardNavbar";
import WallpaperContent from "../components/WallpaperContent";
import "../styles/Wallpaper.scss";

function Wallpaper() {
  const { startLoading, finishLoading } = useLoadingContext();

  const { id } = useParams();
  const { wallpaper, setWallpaper, addWallpaper } = useWallpaperContext();

  useEffect(() => {
    (async () => {
      startLoading();
      await addWallpaper(id);
      finishLoading();
    })();

    return () => setWallpaper(null);
  }, []);

  if (!wallpaper) return null;

  return (
    <WallpaperLayout backgroundImage={wallpaper.imageUrl.large}>
      <header>
        <div className="wallpaper__navbar">
          <StandardNavbar />
        </div>
      </header>

      <main>
        <WallpaperContent />
      </main>
    </WallpaperLayout>
  );
}

export default Wallpaper;
