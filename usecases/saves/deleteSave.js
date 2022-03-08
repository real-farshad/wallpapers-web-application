const validateId = require("../../validation/id");

async function deleteSave(wallpaperId, userId, db) {
    const isValidId = await validateId(wallpaperId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid wallpaperId!",
        };
    }

    let [err, success] = await db.findAndDeleteUserSave(wallpaperId, userId);
    if (err) return err;

    if (!success) {
        return {
            knwon: true,
            status: 404,
            message: "a save with this id, for this user doesn't exist!",
        };
    }

    return null;
}

module.exports = deleteSave;
