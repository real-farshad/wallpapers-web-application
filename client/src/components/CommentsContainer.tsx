import Comment from "./Comment";
import "../styles/CommentsContainer.scss";

function CommentsContainer() {
    return (
        <div className="comments-container">
            <div className="comments-container__comment">
                <Comment>
                    <form className="comments-container__message-form">
                        <input
                            className="comments-container__message-input"
                            placeholder="Say Something"
                        />

                        <button className="comments-container__send-btn">SEND</button>
                    </form>
                </Comment>
            </div>

            <div className="commments-container__comment-messages-container">
                <div className="comments-container__comment">
                    <Comment>
                        <p className="comments-container__message">
                            Vestibulum sollicitudin, lectus quis dignissim lobortis, nisi
                            lectus venenatis nulla, a dignissim enim tellus ut nisl dolor
                            orci.
                        </p>
                    </Comment>
                </div>

                <div className="comments-container__comment">
                    <Comment>
                        <p className="comments-container__message">
                            Vestibulum sollicitudin, lectus quis dignissim lobortis, nisi
                            lectus venenatis nulla, a dignissim enim tellus ut nisl dolor
                            orci.
                        </p>
                    </Comment>
                </div>
            </div>
        </div>
    );
}

export default CommentsContainer;
