import "../styles/Comment.scss";
import UserAvatar from "./UserAvatar";
import PassedTime from "./PassedTime";

interface CommentTypes {
    data: {
        description?: string;
        createdAt: number;
        user: {
            avatar: string;
            username: string;
        };
    };
    children?: any;
}

function Comment(props: CommentTypes) {
    const { description, createdAt, user } = props.data;

    return (
        <div className="comment">
            <div className="comment__primary-container">
                <div className="comment__user-avatar">
                    <UserAvatar src={user.avatar} />
                </div>

                <div>
                    <p className="comment__username">
                        By <button>@{user.username}</button>
                    </p>

                    <p className="comment__publish-date">
                        Published <PassedTime time={createdAt} />
                    </p>
                </div>
            </div>

            <div className="comment__secondary-container">
                {!description ? (
                    props.children
                ) : (
                    <p className="comment__message">{description}</p>
                )}
            </div>
        </div>
    );
}

export default Comment;
