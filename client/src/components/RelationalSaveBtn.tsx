import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import saveWallpaper from "../api/saveWallpaper";
import unsaveWallpaper from "../api/unsaveWallpaper";
import "../styles/RelationalSaveBtn.scss";

interface RelationalSaveBtnTypes {
    wallpaperId: string;
    initialState: boolean;
    loading: boolean;
    setLoading: (v: boolean) => any;
    prompt: null | string;
    setPrompt: (v: null | string) => any;
}

function RelationalSaveBtn(props: RelationalSaveBtnTypes) {
    const {
        wallpaperId,
        initialState,
        loading,
        setLoading,
        prompt,
        setPrompt,
    } = props;
    const { isSignedIn } = useUserContext();

    const [saved, setSaved] = useState(initialState);

    function handleClickOnSave() {
        if (!isSignedIn) return (window.location.href = "/auth/sign-up");
        if (loading || prompt) return;

        (async () => {
            setLoading(true);

            if (saved) await handleUnsave();
            else await handleSave();

            setLoading(false);
        })();
    }

    async function handleSave() {
        const success = await saveWallpaper(wallpaperId);
        if (success) {
            setSaved(true);
            setPrompt("SAVED");
            setTimeout(() => setPrompt(null), 1000);
        }
    }

    async function handleUnsave() {
        const success = await unsaveWallpaper(wallpaperId);
        if (success) {
            setSaved(false);
            setPrompt("UNSAVED");
            setTimeout(() => setPrompt(null), 1000);
        }
    }

    return (
        <button className="relational-save-btn" onClick={handleClickOnSave}>
            {saved ? "Saved" : "Save"}
        </button>
    );
}

export default RelationalSaveBtn;
