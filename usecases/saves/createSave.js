const validateId = require("../../validation/id");

async function createSave(wallpaperId, userId, db) {
    const isValidId = await validateId(wallpaperId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid wallpaperId!",
        };
    }

    let [err, wallpaper] = await db.findWallpaperById(wallpaperId, userId);
    if (err) return err;

    if (!wallpaper) {
        return {
            known: true,
            status: 404,
            message: "a wallpaper with this id doesn't exist!",
        };
    }

    let previousSave;
    [err, previousSave] = await db.findUserSave(wallpaperId, userId);
    if (err) return err;

    if (previousSave) {
        return {
            known: true,
            status: 400,
            message: "wallpaper has already been saved!",
        };
    }

    const save = {
        wallpaperId,
        userId,
        createdAt: Date.now(),
    };

    err = await db.saveWallpaperSave(save);
    if (err) return err;

    return null;
}

module.exports = createSave;
