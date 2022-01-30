const { collectionPostSchema } = require("../schemas/collectionsPostsSchemas");
async function validateCollectionPostObject(collectionPostObject) {
    try {
        const collectionPost = await collectionPostSchema.validateAsync(
            collectionPostObject
        );

        return [null, collectionPost];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

module.exports = validateCollectionPostObject;
