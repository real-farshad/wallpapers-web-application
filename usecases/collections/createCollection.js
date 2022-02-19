const validateCollection = require("../../validation/collection");

async function createCollection(collection, userId, db) {
    let [err, validCollection] = await validateCollection(collection);
    if (err) {
        return {
            known: true,
            status: 400,
            message: err.message,
        };
    }

    validCollection.userId = userId;
    validCollection.wallpaperCount = 0;
    validCollection.createdAt = Date.now();

    err = await db.saveCollection(validCollection);
    if (err) return err;

    return null;
}

module.exports = createCollection;
