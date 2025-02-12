import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import likeWallpaper from "../api/likeWallpaper";
import unlikeWallpaper from "../api/unlikeWallpaper";
import makeStandardCountString from "../utils/makeStandardCountString";
import "../styles/StandardLikeBtn.scss";

interface StandardLikeBtnTypes {
  wallpaperId: string;
  initialState: boolean;
  likeCount: number;
}

function StandardLikeBtn(props: StandardLikeBtnTypes) {
  const { wallpaperId, initialState, likeCount } = props;
  const { isLoggedIn } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(initialState);

  function handleClickOnLikeBtn() {
    if (!isLoggedIn) return (window.location.href = "/auth/sign-up");
    if (loading) return;

    (async () => {
      setLoading(true);

      if (liked) await handleUnlike();
      else await handleLike();

      setLoading(false);
    })();
  }

  async function handleLike() {
    const success = await likeWallpaper(wallpaperId);
    if (success) setLiked(true);
  }

  async function handleUnlike() {
    const success = await unlikeWallpaper(wallpaperId);
    if (success) setLiked(false);
  }

  const standardLikeCount = makeStandardCountString(likeCount);

  return (
    <button className="standard-like-btn" onClick={handleClickOnLikeBtn}>
      <div
        className={`standard-like-btn__primary-container${
          loading ? " standard-like-btn__primary-container--loading" : ""
        }`}
      >
        <div
          className={`standard-like-btn__secondary-container${
            liked ? " standard-like-btn__secondary-container--liked" : ""
          }`}
        >
          <p className="standard-like-btn__like-text">Like</p>
          <p className="standard-like-btn__liked-text">Liked</p>
        </div>
      </div>

      <p className="standard-like-btn__count">{standardLikeCount}</p>
    </button>
  );
}

export default StandardLikeBtn;
