const validateId = require("../utils/validateId");
const {
    collectionsPostsSchemas,
} = require("../schemas/collectionsPostsSchemas");

// GET /:id
// req.query => page, skip
async function getCollectionPosts(req, res, next, database) {
    let [err, params] = await validateQueryParams(req.query);
    if (err) return handleError(err, res, next);

    err = await validateCollectionId(req.params.id, database);
    if (err) return handleError(err, res, next);

    params = formatParams(params);

    try {
        const collectionPosts = await database.findCollectionPosts({
            collectionId: req.params.id,
            ...params,
        });

        return res.json(collectionPosts);
    } catch (err) {
        next(err);
    }
}

async function validateQueryParams(queryParams) {
    let params = {
        page: queryParams.page || 1,
        limit: queryParams.limit || 10,
    };

    try {
        query = await collectionsPostsSchemas.validateAsync(params);
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

async function validateCollectionId(collectionId, database) {
    const isValidId = validateId(collectionId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 403,
            message: "invalid collection id!",
        };

        return knownError;
    }

    try {
        const collection = await database.findCollectionById(collectionId);
        if (!collection) {
            const knownError = {
                known: true,
                status: 404,
                message: "no collection with this id was found!",
            };

            return knownError;
        }
    } catch (err) {
        return err;
    }

    return null;
}

function formatParams(params) {
    const fParams = { ...params };

    fParams.skip = (fParams.page - 1) * fParams.limit;
    delete fParams.page;

    return fParams;
}

module.exports = getCollectionPosts;
