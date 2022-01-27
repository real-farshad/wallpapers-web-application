const validateId = require("./validateId");

async function validatePostId(postId) {
    const isValidPostId = validateId(postId);
    if (!isValidPostId) {
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
