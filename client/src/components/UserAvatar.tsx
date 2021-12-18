import CoverImage from "./CoverImage";
import "../styles/UserAvatar.scss";

interface UserAvatarTypes {
    src: string;
}

function UserAvatar({ src }: UserAvatarTypes) {
    return (
        <div className="user-avatar">
            <CoverImage src={src} />
        </div>
    );
}

export default UserAvatar;
