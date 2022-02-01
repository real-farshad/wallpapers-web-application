const validateId = require("../utils/validateId");

function validatePostId(postId) {
    const isValidId = validateId(postId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 403,
            message: "invalid post id!",
        };

        return knownError;
    } else {
        return null;
    }
}

module.exports = validatePostId;
