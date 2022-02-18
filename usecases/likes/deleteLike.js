const validateId = require("../../validation/id");

async function deleteLike(likeId, userId, db) {
    const isValidId = await validateId(likeId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid likeId!",
        };
    }

    let [err, like] = await db.findAndDeleteUserLike(likeId, userId);
    if (err) return err;

    if (!like) {
        return {
            knwon: true,
            status: 404,
            message: "a like with this id, for this user doesn't exist!",
        };
    }

    err = await db.decrementWallpaperLikeCount(likeId);
    if (err) return err;

    return null;
}

module.exports = deleteLike;
