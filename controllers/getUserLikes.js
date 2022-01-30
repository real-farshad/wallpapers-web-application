const { likesQuerySchema } = require("../schemas/likesSchemas");
const replacePageWithSkip = require("./utils/replacePageWithSkip");
const handleError = require("./utils/handleError");

async function getUserLikes(req, res, next, database) {
    const userId = req.user._id;
    let query = req.query;

    let err;
    [err, query] = await validateQuery(query);
    if (err) return handleError(err, res, next);

    query = replacePageWithSkip(query);

    let likes;
    [err, likes] = await searchUserLikesInDatabase(userId, query, database);
    if (err) return handleError(err, res, next);

    return res.json(likes);
}

async function validateQuery(queryObject) {
    let query = {
        page: queryObject.page || 1,
        limit: queryObject.limit || 20,
    };

    try {
        query = await likesQuerySchema.validateAsync(query);
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

async function searchUserLikesInDatabase(userId, query, database) {
    try {
        const likes = await database.getUserLikes({ userId, ...query });
        return [null, likes];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getUserLikes;
