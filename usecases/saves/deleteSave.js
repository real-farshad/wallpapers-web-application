const validateId = require("../../validation/id");

async function deleteSave(saveId, userId, db) {
    const isValidId = await validateId(saveId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid saveId!",
        };
    }

    let [err, success] = await db.findAndDeleteUserSave(saveId, userId);
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
