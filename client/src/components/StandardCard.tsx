import "../styles/StandardCard.scss";
import CoverImage from "./CoverImage";
import LikeBtn from "./LikeBtn";
import SaveBtn from "./SaveBtn";
import StandardTime from "./StandardTime";

interface StandardCardTypes {
    data: {
        publisher: string;
        createdAt: number;
        imageUrl: string;
        title: string;
        likeCount: number;
    };
}

function StandardCard(props: StandardCardTypes) {
    const { publisher, createdAt, imageUrl, title, likeCount } = props.data;

    return (
        <div className="standard-card">
            <div className="standard-card__primary-info-container">
                <p className="standard-card__publisher">
                    By <a href="#">@{publisher}</a>
                </p>

                <p className="standard-card__publish-date">
                    Published At <StandardTime time={createdAt} />
                </p>
            </div>

            <div className="standard-card__image-container">
                <CoverImage src={imageUrl} />

                <div className="standard-card__image-overlay" />

                <h1 className="standard-card__title">{title}</h1>
            </div>

            <div className="standard-card__btns">
                <div className="standard-card__like-btn">
                    <LikeBtn likeCount={likeCount} />
                </div>

                <div>
                    <SaveBtn />
                </div>
            </div>
        </div>
    );
}

export default StandardCard;
