const handleError = require("./utils/handleError");
const validateCollectionId = require("./validation/validateCollectionId");

async function getSingleCollection(req, res, next, database) {
    const collectionId = req.params.id;

    let err = validateCollectionId(collectionId);
    if (err) return handleError(err, res, next);

    let collection;
    [err, collection] = await findCollectionInDatabase(collectionId, database);
    if (err) return handleError(err, res, next);

    return res.json(collection);
}

async function findCollectionInDatabase(collectionId, database) {
    try {
        const collection = await database.findCollectionById(collectionId);
        return [null, collection];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getSingleCollection;
