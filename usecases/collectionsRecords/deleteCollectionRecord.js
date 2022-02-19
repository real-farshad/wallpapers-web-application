const validateId = require("../../validation/id");

async function deleteCollectionRecord(collectionRecordId, userId, db) {
    const isValidCollectionRecordId = await validateId(collectionRecordId);
    if (!isValidCollectionRecordId) {
        return {
            known: true,
            status: 400,
            message: "invalid collectionRecordId!",
        };
    }

    let [err, collectionRecord] = await db.findUserCollectionRecord(
        collectionRecordId,
        userId
    );
    if (err) return err;

    if (!collectionRecord) {
        return {
            known: true,
            status: 404,
            message:
                "a collectionRecord with this id, for this user, doesn't exist!",
        };
    }

    err = await db.deleteCollectionRecord(collectionRecordId);
    if (err) return err;

    err = await db.decrementCollectionWallpaperCount(
        collectionRecord.collectionId
    );
    if (err) return err;

    return null;
}

module.exports = deleteCollectionRecord;
