const { savesQuerySchema } = require("../schemas/savesSchemas");
const replacePageWithSkip = require("./utils/replacePageWithSkip");
const handleError = require("./utils/handleError");

async function getUserSavedPosts(req, res, next, database) {
    const userId = req.user._id;
    let query = req.query;

    let err;
    [err, query] = await validateQuery(query);
    if (err) return handleError(err, res, next);

    query = replacePageWithSkip(query);

    let savedPosts;
    [err, savedPosts] = await searchUserSavedPostsInDatabase(
        userId,
        query,
        database
    );
    if (err) return handleError(err, res, next);

    return res.json(savedPosts);
}

async function validateQuery(queryObject) {
    let query = {
        page: queryObject.page || 1,
        limit: queryObject.limit || 20,
    };

    try {
        query = await savesQuerySchema.validateAsync(query);
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

async function searchUserSavedPostsInDatabase(userId, query, database) {
    try {
        const savedPosts = await database.getUserSavedPosts({
            userId,
            ...query,
        });

        return [null, savedPosts];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getUserSavedPosts;
