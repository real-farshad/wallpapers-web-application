const { collectionSchema } = require("../../schemas/collectionsSchemas");

async function validateCollectionObject(collectionObject) {
    try {
        const collection = await collectionSchema.validateAsync(
            collectionObject
        );

        return [null, collection];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

module.exports = validateCollectionObject;
