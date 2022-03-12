import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { useWallpaperContext } from "../contexts/WallpaperContext";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "../styles/WallpaperComments.scss";

function WallpaperComments() {
    const { isLoggedIn } = useUserContext();
    const { wallpaper } = useWallpaperContext();

    const comments = wallpaper.comments;

    return (
        <div className="wallpaper-comments">
            <div className="wallpaper-comments__user-comment">
                {isLoggedIn ? (
                    <CommentForm wallpaperId={wallpaper._id} />
                ) : (
                    <div className="wallpaper-comments__auth">
                        <p className="wallpaper-comments__auth-message">
                            To leave a comment, first you need to log into your
                            account.
                        </p>
                        <Link
                            to="/auth/sign-in"
                            className="wallpaper-comments__auth-link"
                        >
                            Log into your account.
                        </Link>
                    </div>
                )}
            </div>

            <div className="commments-container__comments-container">
                {comments.map((comment: any) => (
                    <Comment comment={comment} key={comment._id} />
                ))}
            </div>
        </div>
    );
}

export default WallpaperComments;
