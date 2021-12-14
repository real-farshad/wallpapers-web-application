import { Link } from "react-router-dom";
import CoverImage from "./CoverImage";
import StandardTime from "./StandardTime";
import "../styles/CollectionCard.scss";

interface CollectionCardTypes {
    data: {
        user: { username: string };
        createdAt: number;
        post: { imageUrl: { thumbnail: string } };
        title: string;
        postCount: number;
    };
}

function CollectionCard(props: CollectionCardTypes | any) {
    const { user, createdAt, post, title, postCount } = props.data;

    return (
        <div className="collection-card">
            <div className="collection-card__primary-info">
                <p className="collection-card__publisher">
                    By <a href="/#">@{user.username}</a>
                </p>

                <p className="collection-card__publish-date">
                    Published At <StandardTime time={createdAt} />
                </p>
            </div>

            <div className="collection-card__image-container">
                <CoverImage src={post.imageUrl.thumbnail} />

                <div className="collection-card__image-overlay" />

                <h1 className="collection-card__title collection-card__title--lg">
                    {title}
                </h1>
            </div>

            <div className="collection-card__secondary-info">
                <h1 className="collection-card__title collection-card__title--sm">
                    {title}
                </h1>

                <div className="collection-card__btn">
                    <div className="collection-card__link">
                        <Link to="/">SEE COLLECTION</Link>
                    </div>

                    <p className="collection-card__wallpaper-count">
                        {postCount} Wallpaper{postCount > 1 ? "s" : ""}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CollectionCard;
