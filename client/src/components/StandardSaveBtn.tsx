import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import saveWallpaper from "../api/saveWallpaper";
import unsaveWallpaper from "../api/unsaveWallpaper";
import "../styles/StandardSaveBtn.scss";

interface StandardSaveBtnTypes {
    wallpaperId: string;
    initialState: boolean;
}

function StandardSaveBtn(props: StandardSaveBtnTypes) {
    const { wallpaperId, initialState } = props;
    const { isLoggedIn } = useUserContext();

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(initialState);

    function handleClickOnSaveBtn() {
        if (!isLoggedIn) return (window.location.href = "/auth/sign-up");
        if (loading) return;

        (async () => {
            setLoading(true);

            if (!saved) await handleSave();
            else await handleUnsave();

            setLoading(false);
        })();
    }

    async function handleSave() {
        const success = await saveWallpaper(wallpaperId);
        if (success) setSaved(true);
    }

    async function handleUnsave() {
        const success = await unsaveWallpaper(wallpaperId);
        if (success) setSaved(false);
    }

    return (
        <button
            className={`standard-save-btn${
                loading ? " standard-save-btn--loading" : ""
            }`}
            onClick={handleClickOnSaveBtn}
        >
            <div
                className={`standard-save-btn__container${
                    saved ? " standard-save-btn__container--saved" : ""
                }`}
            >
                <p className="standard-save-btn__save-text">Save</p>
                <p className="standard-save-btn__saved-text">Saved</p>
            </div>
        </button>
    );
}

export default StandardSaveBtn;
