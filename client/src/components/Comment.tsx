import "../styles/Comment.scss";
import UserAvatar from "./UserAvatar";
import StandardTime from "./StandardTime";

import avatar from "../assets/avatar.jpg";

function Comment({ children }: any) {
    return (
        <div className="comment">
            <div className="comment__primary-container">
                <div className="comment__user-avatar">
                    <UserAvatar src={avatar} />
                </div>

                <div>
                    <p className="comment__username">By @Kara</p>

                    <p className="comment__publish-date">
                        Published At <StandardTime time={Date.now()} />
                    </p>
                </div>
            </div>

            <div className="comment__secondary-container">{children}</div>
        </div>
    );
}

export default Comment;
