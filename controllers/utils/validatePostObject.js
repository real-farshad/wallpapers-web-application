const { postSchema } = require("../schemas/postsSchemas");

async function validatePostObject(postObject) {
    try {
        const post = await postSchema.validateAsync(postObject);
        return [null, post];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

module.exports = validatePostObject;
