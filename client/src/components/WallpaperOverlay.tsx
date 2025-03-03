/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useWallpaperContext } from "../contexts/WallpaperContext";
import { usePopState } from "../hooks/usePopState";
import WallpaperLayout from "../components/WallpaperLayout";
import WallpaperContent from "../components/WallpaperContent";
import "../styles/WallpaperOverlay.scss";

function WallpaperOverlay() {
  const { wallpaper, wallpaperId, lastUrl, setWallpaperId, setLastUrl } =
    useWallpaperContext();

  useEffect(() => {
    if (wallpaperId) {
      setLastUrl(window.location.href);
      window.history.pushState("", "", "/wallpaper/" + wallpaperId);
    }
  }, [wallpaperId]);

  usePopState(() => {
    handleClickOnGoBackBtn();
  });

  function handleClickOnGoBackBtn() {
    window.history.pushState("", "", lastUrl);
    setWallpaperId(null);
    setLastUrl("");
  }

  if (!wallpaper) return null;

  return (
    <div className="wallpaper-overlay">
      <WallpaperLayout backgroundImage={wallpaper.imageUrl.large}>
        <div className="wallpaper-overlay__navbar">
          <button
            className="wallpaper-overlay__go-back-btn"
            onClick={handleClickOnGoBackBtn}
          >
            Go Back
          </button>
        </div>

        <WallpaperContent />
      </WallpaperLayout>
    </div>
  );
}

export default WallpaperOverlay;
