const { commentSchema } = require("../schemas/commentsSchemas");

async function validateCommentObject(commentObject) {
    try {
        const comment = await commentSchema.validateAsync(commentObject);
        return [null, comment];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

module.exports = validateCommentObject;
