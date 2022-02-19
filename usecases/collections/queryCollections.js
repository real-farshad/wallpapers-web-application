const validateCollectionsQuery = require("../../validation/collectionsQuery");

async function queryCollections(query, db) {
    let [err, validQuery] = await validateCollectionsQuery(query);
    if (err) {
        const knownError = { known: true, status: 400, message: err.message };
        return [knownError, null];
    }

    let collections;
    [err, collections] = await db.queryCollections(validQuery);
    if (err) return [err, null];

    return [null, collections];
}

module.exports = queryCollections;
