import "../styles/LoadingTitle.scss";

function LoadingTitle() {
  return (
    <div className="loading-title">
      <span className="loading-title__text">Loading</span>

      <span className="loading-title__dots">
        <span className="loading-title__dot loading-title__dot--first"> .</span>

        <span className="loading-title__dot loading-title__dot--second">
          {" "}
          .
        </span>

        <span className="loading-title__dot loading-title__dot--third"> .</span>
      </span>
    </div>
  );
}

export default LoadingTitle;
