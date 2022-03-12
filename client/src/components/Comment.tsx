import calculateElapsedTime from "../utils/calculateElapsedTime";
import UserInfo from "./UserInfo";
import "../styles/Comment.scss";

interface CommentTypes {
    comment: {
        description?: string;
        createdAt?: number;
        user: {
            avatar: string;
            username: string;
        };
    };
}

function Comment(props: CommentTypes) {
    const { description, createdAt, user } = props.comment;
    const { avatar, username } = user;

    const timeSincePublish = calculateElapsedTime(createdAt as number);

    return (
        <div className="comment">
            <div className="comment__primary-container">
                <UserInfo
                    avatar={avatar}
                    username={username}
                    timeString={`Published ${timeSincePublish}`}
                />
            </div>

            <div className="comment__secondary-container">
                <p className="comment__message">{description}</p>
            </div>
        </div>
    );
}

export default Comment;
