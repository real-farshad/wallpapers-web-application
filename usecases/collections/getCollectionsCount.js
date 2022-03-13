const validateCountCollectionsQuery = require("../../validation/countCollectionsQuery");

async function getCollectionsCount(query, db) {
    let [err, validQuery] = await validateCountCollectionsQuery(query);
    if (err) {
        const knownError = { known: true, status: 400, message: err.message };
        return [knownError, null];
    }

    let collectionsCount;
    [err, collectionsCount] = await db.getCollectionsCount(validQuery);
    if (err) return [err, null];

    return [null, collectionsCount];
}

module.exports = getCollectionsCount;
