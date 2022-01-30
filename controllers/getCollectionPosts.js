const {
    collectionsPostsSchemas,
} = require("../schemas/collectionsPostsSchemas");
const validateCollectionId = require("./utils/validateCollectionId");
const checkCollectionExists = require("./utils/checkCollectionExists");
const handleError = require("./utils/handleError");
const replacePageWithSkip = require("./utils/replacePageWithSkip");

async function getCollectionPosts(req, res, next, database) {
    const collectionId = req.params.id;
    let query = req.query;

    let err;
    [err, query] = await validateQuery(query);
    if (err) return handleError(err, res, next);

    err = await validateCollection(collectionId, database);
    if (err) return handleError(err, res, next);

    query = replacePageWithSkip(query);

    let collectionPosts;
    [err, collectionPosts] = await searchCollectionPostsInDatabase(
        collectionId,
        query,
        database
    );
    if (err) return handleError(err, res, next);

    return res.json(collectionPosts);
}

async function validateQuery(queryObject) {
    let query = {
        page: queryObject.page || 1,
        limit: queryObject.limit || 10,
    };

    try {
        query = await collectionsPostsSchemas.validateAsync(query);
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

async function validateCollection(collectionId, database) {
    let err = validateCollectionId(collectionId);
    if (err) return err;

    err = await checkCollectionExists(collectionId, database);
    if (err) return err;

    return null;
}

async function searchCollectionPostsInDatabase(collectionId, query, database) {
    try {
        const collectionPosts = await database.findCollectionPosts({
            collectionId,
            ...query,
        });

        return [null, collectionPosts];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getCollectionPosts;
