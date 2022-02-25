const validateId = require("../../validation/id");
const validateCollectionRecordsQuery = require("../../validation/collectionRecordsQuery");
const res = require("express/lib/response");

async function findCollectionRecords(collectionId, query, db) {
    const isValidId = await validateId(collectionId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 400,
            message: "invalid collectionId!",
        };

        return [knownError, null];
    }

    let [err, validQuery] = await validateCollectionRecordsQuery(query);
    if (err) {
        const knownError = { known: true, status: 400, message: err.message };
        return [knownError, null];
    }

    let collectionRecords;
    [err, collectionRecords] = await db.queryCollectionRecords(
        collectionId,
        validQuery
    );
    if (err) return [err, null];

    if (!collectionRecords) {
        const knownError = {
            known: true,
            status: 404,
            message: "a collection with this id doesn't exist!",
        };

        return [knownError, null];
    }

    return [null, collectionRecords];
}

module.exports = findCollectionRecords;
