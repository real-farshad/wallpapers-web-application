import Comment from "./Comment";
import "../styles/WallpaperComments.scss";

interface WallpaperCommentsTypes {
    comments: [
        {
            _id: string;
            description: string;
            createdAt: number;
            user: {
                avatar: string;
                username: string;
            };
        }
    ];
}

function WallpaperComments({ comments }: WallpaperCommentsTypes) {
    const currentUser = { ...comments[0], description: undefined };

    return (
        <div className="wallpaper-comments">
            <div className="wallpaper-comments__comment">
                <Comment data={currentUser}>
                    <form className="wallpaper-comments__message-form">
                        <input
                            className="wallpaper-comments__message-input"
                            placeholder="Say Something"
                        />

                        <button className="wallpaper-comments__send-btn">SEND</button>
                    </form>
                </Comment>
            </div>

            <div className="commments-container__comment-messages-container">
                {comments.map((comment, index) => {
                    if (index > 1) return;
                    return <Comment data={comment} key={comment._id} />;
                })}
            </div>
        </div>
    );
}

export default WallpaperComments;
