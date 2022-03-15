import { useUserContext } from "../contexts/UserContext";
import likeWallpaper from "../api/likeWallpaper";
import unlikeWallpaper from "../api/unlikeWallpaper";
import makeStandardCountString from "../utils/makeStandardCountString";
import "../styles/LikeBtn.scss";

interface LikeBtnTypes {
    wallpaperId: string;
    liked: boolean;
    setLiked: (v: boolean) => any;
    likeCount: number;
    loading?: boolean;
    setLoading?: (v: boolean) => any;
    prompt?: null | string;
    setPrompt?: (v: null | string) => any;
    secondaryStyle?: boolean;
}

function LikeBtn(props: LikeBtnTypes) {
    const { isLoggedIn } = useUserContext();

    const {
        wallpaperId,
        liked,
        setLiked,
        likeCount,
        loading,
        setLoading,
        prompt,
        setPrompt,
        secondaryStyle,
    } = props;

    const standardLikeCount = makeStandardCountString(likeCount);

    function handleClickOnLike() {
        if (!isLoggedIn) return (window.location.href = "/auth/sign-up");
        if (loading || prompt) return;

        (async () => {
            if (setLoading) setLoading(true);

            if (liked) await handleUnlike();
            else await handleLike();

            if (setLoading) setLoading(false);
        })();
    }

    async function handleLike() {
        const success = await likeWallpaper(wallpaperId);
        if (success) {
            setLiked(true);
            if (setPrompt) setPrompt("LIKED");
        }
    }

    async function handleUnlike() {
        const success = await unlikeWallpaper(wallpaperId);
        if (success) {
            setLiked(false);
            if (setPrompt) setPrompt("UNLIKED");
        }
    }

    return (
        <button className="like-btn" onClick={handleClickOnLike}>
            <p
                className={`like-btn__text${
                    secondaryStyle ? " like-btn__text--all-caps" : ""
                }`}
            >
                {liked ? "Liked" : "Like"}
            </p>

            <p
                className={`like-btn__count${
                    secondaryStyle ? " like-btn__count--low-opacity" : ""
                }`}
            >
                {standardLikeCount}
            </p>
        </button>
    );
}

export default LikeBtn;
