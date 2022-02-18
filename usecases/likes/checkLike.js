const validateId = require("../../validation/id");

async function checkLike(wallpaperId, userId, db) {
    let err;
    const isValidId = await validateId(wallpaperId);
    if (!isValidId) {
        err = {
            known: true,
            status: 400,
            message: "invalid wallpaperId!",
        };
        return [err, null];
    }

    let like;
    [err, like] = await db.findUserLike(wallpaperId, userId);
    if (err) return [err, null];

    if (!like) return [null, false];
    else return [null, true];
}

module.exports = checkLike;
