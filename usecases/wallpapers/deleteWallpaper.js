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
            message: "no wallpaper with this id was found!",
        };
    }

    return null;
}

module.exports = deleteWallpaper;
