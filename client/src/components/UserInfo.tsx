import UserAvatar from "./UserAvatar";
import "../styles/UserInfo.scss";

interface UserInfoTypes {
    avatar: string;
    username: string;
    timeString: string;
}

function UserInfo(props: UserInfoTypes) {
    const { avatar, username, timeString } = props;

    return (
        <div className="user-info">
            <div className="user-info__avatar">
                <UserAvatar src={avatar} />
            </div>

            <div>
                <p className="user-info__username">
                    By <button>@{username}</button>
                </p>

                <p className="user-info__time">{timeString}</p>
            </div>
        </div>
    );
}

export default UserInfo;
