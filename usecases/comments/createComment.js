const validateComment = require("../../validation/comment");

async function createComment(comment, userId, db) {
    let [err, validComment] = await validateComment(comment);
    if (err) {
        return {
            known: true,
            status: 400,
            message: err.message,
        };
    }

    let wallpaper;
    [err, wallpaper] = await db.findWallpaperById(validComment.wallpaperId);
    if (err) return err;

    if (!wallpaper) {
        return {
            known: true,
            status: 404,
            message: "a wallpaper with this id doesn't exist!",
        };
    }

    validComment.userId = userId;
    validComment.createdAt = Date.now();

    err = await db.saveComment(validComment);
    if (err) return err;

    return null;
}

module.exports = createComment;
