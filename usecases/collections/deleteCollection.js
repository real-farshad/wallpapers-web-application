const validateId = require("../../validation/id");

async function deleteCollection(collectionId, userId, db) {
    const isValidId = await validateId(collectionId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid collectionId!",
        };
    }

    let [err, collection] = await db.findUserCollection(collectionId, userId);
    if (err) return err;

    if (!collection) {
        return {
            known: true,
            status: 404,
            message: "a collection with this id, for this user, doesn't exist!",
        };
    }

    err = await db.deleteCollectionRecords(collectionId);
    if (err) return err;

    err = await db.deleteCollection(collectionId);
    if (err) return err;

    return null;
}

module.exports = deleteCollection;
