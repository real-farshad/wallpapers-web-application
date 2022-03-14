import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import addNewComment from "../api/addNewComment";
import UserInfo from "./UserInfo";
import "../styles/CommentForm.scss";

interface CommentFormTypes {
    wallpaperId: string;
}

function CommentForm(props: CommentFormTypes) {
    const { wallpaperId } = props;

    const { user } = useUserContext();
    const { avatar, username } = user;

    const [message, setMessage] = useState("");

    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const hasValidMessage = message !== "" || message.length > 3;
        if (!hasValidMessage) return;

        const comment = {
            description: message,
            wallpaperId,
        };

        await addNewComment(comment);
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
