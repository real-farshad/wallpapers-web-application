import saveWallpaper from "../api/saveWallpaper";
import unsaveWallpaper from "../api/unsaveWallpaper";
import { useUserContext } from "../contexts/UserContext";
import "../styles/SaveBtn.scss";

interface SaveBtnTypes {
    wallpaperId: string;
    saved: boolean;
    setSaved: (v: boolean) => any;
    loading?: boolean;
    setLoading?: (v: boolean) => any;
    prompt?: null | string;
    setPrompt?: (v: null | string) => any;
    secondaryStyle?: boolean;
}

function SaveBtn(props: SaveBtnTypes) {
    const { isLoggedIn } = useUserContext();

    const {
        wallpaperId,
        saved,
        setSaved,
        loading,
        setLoading,
        prompt,
        setPrompt,
        secondaryStyle,
    } = props;

    function handleClickOnSave() {
        if (!isLoggedIn) return (window.location.href = "/auth/sing-up");
        if (loading || prompt) return;

        (async () => {
            if (setLoading) setLoading(true);

            if (saved) await handleUnsave();
            else await handleSave();

            if (setLoading) setLoading(false);
        })();
    }

    async function handleSave() {
        const success = await saveWallpaper(wallpaperId);
        if (success) {
            setSaved(true);
            if (setPrompt) setPrompt("SAVED");
        }
    }

    async function handleUnsave() {
        const success = await unsaveWallpaper(wallpaperId);
        if (success) {
            setSaved(false);
            if (setPrompt) setPrompt("UNSAVED");
        }
    }

    return (
        <button
            className={`save-btn${secondaryStyle ? " save-btn--all-caps" : ""}`}
            onClick={handleClickOnSave}
        >
            {saved ? "Saved" : "Save"}
        </button>
    );
}

export default SaveBtn;
