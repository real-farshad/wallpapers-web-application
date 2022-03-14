import { useState } from "react";
import saveWallpaper from "../api/saveWallpaper";
import unsaveWallpaper from "../api/unsaveWallpaper";
import { useUserContext } from "../contexts/UserContext";
import "../styles/SaveBtn.scss";

interface SaveBtnTypes {
    wallpaperId: string;
    isSaved: boolean;
    secondaryStyle?: boolean;
}

function SaveBtn(props: SaveBtnTypes) {
    const { isLoggedIn } = useUserContext();

    const { wallpaperId, isSaved, secondaryStyle } = props;

    const [saved, setSaved] = useState(isSaved);

    function handleClickOnSave() {
        if (!isLoggedIn) return (window.location.href = "/auth/sing-up");

        if (saved) handleUnsave();
        else handleSave();
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
            className={`save-btn${secondaryStyle ? " save-btn--all-caps" : ""}`}
            onClick={handleClickOnSave}
        >
            {saved ? "Saved" : "Save"}
        </button>
    );
}

export default SaveBtn;
