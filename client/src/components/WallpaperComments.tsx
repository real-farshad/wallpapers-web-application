import { useWallpaperContext } from "../contexts/WallpaperContext";
import Comment from "./Comment";
import "../styles/WallpaperComments.scss";

function WallpaperComments() {
    const { wallpaper } = useWallpaperContext();
    const comments = wallpaper.comments;

    const currentUser = {
        user: {
            username: "ellie",
            avatar: "/images/ellie.jpg",
        },
    };

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
                {comments.map((comment: any, index: number) => {
                    if (index > 1) return;
                    return <Comment data={comment} key={comment._id} />;
                })}
            </div>
        </div>
    );
}

export default WallpaperComments;
