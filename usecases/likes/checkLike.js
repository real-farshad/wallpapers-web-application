const validateId = require("../../validation/id");

async function checkLike(wallpaperId, userId, db) {
    let err;
    const isValidId = await validateId(wallpaperId);
    if (!isValidId) {
        err = {
            known: true,
            status: 400,
            message: "invalid wallpaper id!",
        };
        return [err, null];
    }

    let like;
    [err, like] = await db.findUserLike(wallpaperId, userId);
    if (err) return [err, null];

    if (like) return [null, true];
    else return [null, false];
}

module.exports = checkLike;
