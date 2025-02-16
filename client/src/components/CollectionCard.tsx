import { Link } from "react-router-dom";
import makeStandardTimeString from "../utils/makeStandardTimeString";
import CoverImage from "./CoverImage";
import "../styles/CollectionCard.scss";

interface CollectionCardTypes {
  data: {
    _id: string;
    user: { username: string };
    createdAt: number;
    wallpaper: { imageUrl: { thumbnail: string } };
    title: string;
    wallpaperCount: number;
  };
}

function CollectionCard(props: CollectionCardTypes | any) {
  const { _id, user, createdAt, wallpaper, title, wallpaperCount } = props.data;

  const standardPublishDate = makeStandardTimeString(createdAt);

  return (
    <div className="collection-card">
      <div className="collection-card__primary-info">
        <p className="collection-card__publisher">
          By <a href="#!">@{user.username}</a>
        </p>

        <p className="collection-card__publish-date">
          Published At {standardPublishDate}
        </p>
      </div>

      <Link
        to={`/collections/${_id}`}
        className="collection-card__image-container"
      >
        <CoverImage src={wallpaper.imageUrl.thumbnail} />

        <div className="collection-card__image-overlay" />

        <h1 className="collection-card__title collection-card__title--lg">
          {title}
        </h1>
      </Link>

      <div className="collection-card__secondary-info">
        <h1 className="collection-card__title collection-card__title--sm">
          {title}
        </h1>

        <div className="collection-card__btn">
          <div className="collection-card__link">
            <Link to={`/collections/${_id}`}>SEE COLLECTION</Link>
          </div>

          <p className="collection-card__wallpaper-count">
            {wallpaperCount} Wallpaper
            {wallpaperCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CollectionCard;
