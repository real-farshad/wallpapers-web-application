const { collectionsQuerySchema } = require("../schemas/collectionsSchemas");
const handleError = require("../utils/handleError");

// GET /
// req.query => page, limit
async function getNewCollections(req, res, next, database) {
    let [err, params] = await validateQueryParams(req.query);
    if (err) return handleError(err, res, next);

    params = formatParams(params);

    try {
        const collections = await database.findCollections(...params);
        return res.json(collections);
    } catch (err) {
        return next(err);
    }
}

async function validateQueryParams(queryParams) {
    let params = {
        search: queryParams.search || "",
        page: queryParams.page || 1,
        limit: queryParams.limit || 3,
    };

    try {
        query = await collectionsQuerySchema.validateAsync(params);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };
        return [knownError, null];
    }

    return [null, params];
}

function formatParams(params) {
    const fParams = { ...params };

    fParams.skip = (fParams.page - 1) * fParams.limit;
    delete fParams.page;

    return fParams;
}

module.exports = getNewCollections;
