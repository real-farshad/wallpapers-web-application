const { collectionsQuerySchema } = require("../schemas/collectionsSchemas");
const replacePageWithSkip = require("./utils/replacePageWithSkip");
const handleError = require("./utils/handleError");

async function getNewCollections(req, res, next, database) {
    let query = req.query;

    let err;
    [err, query] = await validateQuery(query);
    if (err) return handleError(err, res, next);

    query = replacePageWithSkip(query);

    let collections;
    [err, collections] = await searchCollectionsInDatabase(query, database);
    if (err) return handleError(err, res, next);

    return res.json(collections);
}

async function validateQuery(queryObject) {
    let query = {
        search: queryObject.search || "",
        page: queryObject.page || 1,
        limit: queryObject.limit || 3,
    };

    try {
        query = await collectionsQuerySchema.validateAsync(query);
        return [null, query];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

async function searchCollectionsInDatabase(query, database) {
    try {
        const collections = await database.findCollections(...query);
        return [null, collections];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getNewCollections;
