const validateId = require("../../utils/validateId");

async function deleteWallpaper(wallpaperId, db) {
    const isValidId = validateId(wallpaperId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid wallpaper id!",
        };
    }

    const [err, success] = await db.findAndDeleteWallpaper(wallpaperId);
    if (err) return err;

    if (!success) {
        return {
            known: true,
            status: 404,
            message: "a wallpaper with this id doesn't exist!",
        };
    }

    return null;
}

module.exports = deleteWallpaper;
