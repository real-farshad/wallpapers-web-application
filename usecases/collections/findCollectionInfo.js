const validateId = require("../../validation/id");

async function findCollectionInfo(collectionId, db) {
    const isValidId = await validateId(collectionId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 400,
            message: "invalid collectionId!",
        };

        return [knownError, null];
    }

    const [err, collection] = await db.findCollectionById(collectionId);
    if (err) return [err, null];

    if (!collection) {
        const knownError = {
            known: true,
            status: 404,
            message: "a collection with this id doesn't exist!",
        };

        return [knownError, null];
    }

    return [null, collection];
}

module.exports = findCollectionInfo;
