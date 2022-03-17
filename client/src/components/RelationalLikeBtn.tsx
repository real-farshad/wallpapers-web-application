import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import likeWallpaper from "../api/likeWallpaper";
import unlikeWallpaper from "../api/unlikeWallpaper";
import makeStandardCountString from "../utils/makeStandardCountString";
import "../styles/RelationalLikeBtn.scss";

interface RelationalLikeBtnTypes {
    wallpaperId: string;
    initialState: boolean;
    likeCount: number;
    loading: boolean;
    setLoading: (v: boolean) => any;
    prompt: null | string;
    setPrompt: (v: null | string) => any;
}

function RelationalLikeBtn(props: RelationalLikeBtnTypes) {
    const navigate = useNavigate();

    const {
        wallpaperId,
        initialState,
        likeCount,
        loading,
        setLoading,
        prompt,
        setPrompt,
    } = props;
    const { isLoggedIn } = useUserContext();

    const [liked, setLiked] = useState(initialState);

    function handleClickOnLikeBtn() {
        if (!isLoggedIn) return navigate("/auth/sign-up");
        if (loading || prompt) return;

        (async () => {
            setLoading(true);

            if (liked) await handleUnlike();
            else await handleLike();

            setLoading(false);
        })();
    }

    async function handleLike() {
        const success = await likeWallpaper(wallpaperId);
        if (success) {
            setLiked(true);
            setPrompt("LIKED");
            setTimeout(() => setPrompt(null), 1000);
        }
    }

    async function handleUnlike() {
        const success = await unlikeWallpaper(wallpaperId);
        if (success) {
            setLiked(false);
            setPrompt("UNLIKED");
            setTimeout(() => setPrompt(null), 1000);
        }
    }

    const standardLikeCount = makeStandardCountString(likeCount);

    return (
        <button className="relational-like-btn" onClick={handleClickOnLikeBtn}>
            <p className="relational-like-btn__text">
                {liked ? "Liked" : "Like"}
            </p>

            <p className="relational-like-btn__count">{standardLikeCount}</p>
        </button>
    );
}

export default RelationalLikeBtn;
