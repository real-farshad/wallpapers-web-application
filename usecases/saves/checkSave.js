const validateId = require("../../validation/id");

async function checkSave(wallpaperId, userId, db) {
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

    let save;
    [err, save] = await db.findUserSave(wallpaperId, userId);
    if (err) return [err, null];

    if (!save) return [null, false];
    else return [null, true];
}

module.exports = checkSave;
