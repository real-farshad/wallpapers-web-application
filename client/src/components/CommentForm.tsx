import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useWallpaperContext } from "../contexts/WallpaperContext";
import addNewComment from "../api/addNewComment";
import UserInfo from "./UserInfo";
import "../styles/CommentForm.scss";

interface CommentFormTypes {
  wallpaperId: string;
}

function CommentForm(props: CommentFormTypes) {
  const { id } = useParams();
  const { wallpaperId } = props;

  const { user } = useUserContext();
  const { avatar, username } = user;

  const { addWallpaper } = useWallpaperContext();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFormSubmit(e: any) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const hasValidMessage = message !== "" || message.length > 3;
    if (!hasValidMessage) return;

    const comment = {
      description: message,
      wallpaperId,
    };

    await addNewComment(comment);
    await addWallpaper(id);

    setMessage("");
    setLoading(false);
  }

  return (
    <div className="comment-form">
      <div className="comment-form__primary-container">
        <UserInfo
          avatar={avatar}
          username={username}
          timeString="Currently Active User"
        />
      </div>

      <div>
        <form
          className="comment-form__secondary-container"
          onSubmit={handleFormSubmit}
        >
          <input
            className="comment-form__message-input"
            type="text"
            maxLength={256}
            placeholder="Say Something"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="comment-form__send-btn">SEND</button>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
