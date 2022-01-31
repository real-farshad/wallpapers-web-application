const validateId = require("../utils/validateId");

function validateCommentId(commentId) {
    const isValidId = validateId(commentId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 403,
            message: "invalid comment id!",
        };

        return knownError;
    } else {
        return null;
    }
}

module.exports = validateCommentId;
