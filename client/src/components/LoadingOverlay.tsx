import { useLoadingContext } from "../contexts/LoadingContext";
import CoverImage from "./CoverImage";
import LoadingInfo from "./LoadingInfo";
import loadingBackgroundImage from "../assets/loading-background-image.jpg";
import "../styles/LoadingOverlay.scss";

function LoadingOverlay() {
  const { startCloseAnimation } = useLoadingContext();

  return (
    <div className="loading-overlay">
      <div
        className={`loading-overlay__content-container${
          startCloseAnimation
            ? " loading-overlay__content-container--animate-out"
            : ""
        }`}
      >
        <div className="loading-overlay__background-image-container">
          <CoverImage src={loadingBackgroundImage} />
        </div>

        <div className="loading-overlay__info-container">
          <div className="loading-overlay__info">
            <LoadingInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlay;
