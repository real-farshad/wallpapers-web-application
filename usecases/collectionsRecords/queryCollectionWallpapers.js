const validateId = require("../../validation/id");
const validateCollectionWallpapersQuery = require("../../validation/collectionWallpapersQuery");

async function queryCollectionWallpapers(collectionId, userId, query, db) {
    const isValidId = await validateId(collectionId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 400,
            message: "invalid collectionId!",
        };

        return [knownError, null];
    }

    let [err, validQuery] = await validateCollectionWallpapersQuery(query);
    if (err) {
        const knownError = { known: true, status: 400, message: err.message };
        return [knownError, null];
    }

    let collectionWallpapers;
    [err, collectionWallpapers] = await db.queryCollectionWallpapers(
        collectionId,
        userId,
        validQuery
    );
    if (err) return [err, null];

    if (!collectionWallpapers) {
        const knownError = {
            known: true,
            status: 404,
            message: "a collection with this id doesn't exist!",
        };

        return [knownError, null];
    }

    return [null, collectionWallpapers];
}

module.exports = queryCollectionWallpapers;
