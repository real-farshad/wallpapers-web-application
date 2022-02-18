const validateId = require("../../validation/id");

async function deleteComment(commentId, userId, db) {
    const isValidId = await validateId(commentId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid commentId!",
        };
    }

    let [err, success] = await db.findAndDeleteUserComment(commentId, userId);
    if (err) return err;

    if (!success) {
        return {
            known: true,
            status: 404,
            message: "a comment with this id, for this user, doesn't exist!",
        };
    }

    return null;
}

module.exports = deleteComment;
