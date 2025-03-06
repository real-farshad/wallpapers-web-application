import { useEffect, useState } from "react";
import { useWallpaperContext } from "../contexts/WallpaperContext";
import makeStandardTimeString from "../utils/makeStandardTimeString";
import CoverImage from "./CoverImage";
import RelationalLikeBtn from "./RelationalLikeBtn";
import RelationalSaveBtn from "./RelationalSaveBtn";
import "../styles/WallpaperCard.scss";

interface WallpaperCardTypes {
  data: {
    _id: string;
    publisher: { username: string };
    createdAt: number;
    imageUrl: { thumbnail: string };
    title: string;
    likeCount: number;
    liked?: boolean;
    saved?: boolean;
  };
}

function WallpaperCard(props: WallpaperCardTypes | any) {
  const { _id, publisher, createdAt, imageUrl, title, likeCount } = props.data;

  const { wallpaper, wallpaperId, setWallpaperId } = useWallpaperContext();

  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(null as null | string);

  useEffect(() => {
    setLoading(false);
  }, [wallpaper]);

  function handleClickOnWallpaperCard() {
    if (wallpaperId) return;

    setLoading(true);
    setWallpaperId(_id);
  }

  const standardPublishDate = makeStandardTimeString(createdAt);
  const initialLikeState = props.data.liked ? props.data.liked : false;
  const initialSaveState = props.data.saved ? props.data.saved : false;

  return (
    <div className="wallpaper-card">
      <div className="wallpaper-card__primary-info">
        <p className="wallpaper-card__publisher">
          By <a href="#!">@{publisher}</a>
        </p>

        <p className="wallpaper-card__publish-date">
          Published At {standardPublishDate}
        </p>
      </div>

      <div
        className="wallpaper-card__image-container"
        onClick={handleClickOnWallpaperCard}
      >
        <CoverImage src={imageUrl.thumbnail} />

        <div className="wallpaper-card__image-overlay" />

        {loading && <div className="wallpaper-card__loading" />}

        {prompt && (
          <div className="wallpaper-card__prompt">
            <div className="wallpaper-card__prompt-background" />
            <p className="wallpaper-card__prompt-text">{prompt}</p>
          </div>
        )}

        <h1 className="wallpaper-card__title wallpaper-card__title--lg">
          {title}
        </h1>
      </div>

      <div className="wallpaper-card__secondary-info">
        <h1 className="wallpaper-card__title wallpaper-card__title--sm">
          {title}
        </h1>

        <div className="wallpaper-card__btns-container">
          <div className="wallpaper-card__like-btn">
            <RelationalLikeBtn
              wallpaperId={_id}
              initialState={initialLikeState}
              likeCount={likeCount}
              loading={loading}
              setLoading={setLoading}
              prompt={prompt}
              setPrompt={setPrompt}
            />
          </div>

          <RelationalSaveBtn
            wallpaperId={_id}
            initialState={initialSaveState}
            loading={loading}
            setLoading={setLoading}
            prompt={prompt}
            setPrompt={setPrompt}
          />
        </div>
      </div>
    </div>
  );
}

export default WallpaperCard;
