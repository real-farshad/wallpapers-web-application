const validateCollectionRecord = require("../../validation/collectionRecord");

async function createCollectionRecord(collectionRecord, userId, db) {
    let [err, validCollectionRecord] = await validateCollectionRecord(
        collectionRecord
    );
    if (err) {
        return {
            known: true,
            status: 400,
            message: err.message,
        };
    }

    let collection;
    [err, collection] = await db.findUserCollection(
        validCollectionRecord.collectionId,
        userId
    );
    if (err) return err;

    if (!collection) {
        return {
            known: true,
            status: 404,
            message: "a collection with this id, for this user, doesn't exist!",
        };
    }

    validCollectionRecord.userId = userId;
    validCollectionRecord.createdAt = Date.now();

    err = await db.saveCollectionRecord(validCollectionRecord);
    if (err) return err;

    err = await db.incrementCollectionWallpaperCount(
        validCollectionRecord.collectionId
    );
    if (err) return err;

    return null;
}

module.exports = createCollectionRecord;
