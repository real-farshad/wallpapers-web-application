const validateId = require("../../validation/id");

async function deleteLike(wallpaperId, userId, db) {
    const isValidId = await validateId(wallpaperId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid wallpaperId!",
        };
    }

    let [err, success] = await db.findAndDeleteUserLike(wallpaperId, userId);
    if (err) return err;

    if (!success) {
        return {
            knwon: true,
            status: 404,
            message: "a like with this id, for this user doesn't exist!",
        };
    }

    err = await db.decrementWallpaperLikeCount(wallpaperId);
    if (err) return err;

    return null;
}

module.exports = deleteLike;
