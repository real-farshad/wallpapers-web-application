import "../styles/StandardCard.scss";
import CoverImage from "./CoverImage";
import LikeBtn from "./LikeBtn";
import SaveBtn from "./SaveBtn";

interface StandardCard {
    data: {
        imageUrl: {
            thumbnail: string;
            large: string;
        };
        publisher: {
            username: string;
        };
        createdAt: number;
        title: string;
        likeCount: string;
    };
}

function StandardCard(props: StandardCard) {
    const { imageUrl, publisher, createdAt, title, likeCount } = props.data;

    return (
        <div className="standard-card">
            <div className="standard-card__primary-info-container">
                <p className="standard-card__publisher">
                    By <a href="#">@{publisher.username}</a>
                </p>

                <p className="standard-card__publish-date">Published At 25 Nov 2022</p>
            </div>

            <div className="standard-card__image-container">
                <CoverImage src={imageUrl.thumbnail} />

                <div className="standard-card__image-overlay" />

                <h1 className="standard-card__title">{title}</h1>
            </div>

            <div className="standard-card__btns">
                <div className="standard-card__like-btn">
                    <LikeBtn />
                </div>

                <div>
                    <SaveBtn />
                </div>
            </div>
        </div>
    );
}

export default StandardCard;
