import { useLoadingContext } from "../contexts/LoadingContext";
import "../styles/LoadingOverlay.scss";

function LoadingOverlay() {
    const { animation } = useLoadingContext();

    return (
        <div className="loading-overlay">
            <div
                className={`loading-overlay__background${
                    animation.secondStep
                        ? " loading-overlay__background--animate-out"
                        : ""
                }`}
            />

            <div
                className={`loading-overlay__container${
                    animation.firstStep
                        ? " loading-overlay__container--animate-out"
                        : ""
                }`}
            >
                <div className="loading-overlay__spinner">
                    <div className="loading-overlay__circle" />
                    <div className="loading-overlay__circle" />
                    <div className="loading-overlay__circle" />
                    <div className="loading-overlay__circle" />
                    <div className="loading-overlay__circle" />
                </div>

                <div className="loading-overlay__text">LOADING</div>
            </div>
        </div>
    );
}

export default LoadingOverlay;
