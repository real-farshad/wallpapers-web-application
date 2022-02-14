const validateId = require("../../utils/validateId");

async function findSingleWallpaper(wallpaperId, db) {
    const isValidId = validateId(wallpaperId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 400,
            message: "invalid wallpaper id!",
        };

        return [knownError, null];
    }

    const [err, wallpaper] = await db.findWallpaperById(wallpaperId);
    if (err) return [err, null];

    if (!wallpaper) {
        const knownError = {
            known: true,
            status: 404,
            message: "a wallpaper with this id doesn't exist!",
        };

        return [knownError, null];
    }

    return [null, wallpaper];
}

module.exports = findSingleWallpaper;
