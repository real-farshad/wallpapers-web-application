const handleError = require("./utils/handleError");
const { commentsQuerySchema } = require("../schemas/commentsSchemas");
const replacePageWithSkip = require("./utils/replacePageWithSkip");

async function getUserComments(req, res, next, database) {
    const userId = req.user._id;
    let query = req.query;

    let err;
    [err, query] = await validateQuery(query);
    if (err) return handleError(err, res, next);

    query = replacePageWithSkip(query);

    let comments;
    [err, comments] = await searchUserCommentsInDatabase(
        userId,
        query,
        database
    );
    if (err) return handleError(err, res, next);

    return res.json(comments);
}

async function validateQuery(queryObject) {
    let query = {
        page: queryObject.page || 1,
        limit: queryObject.limit || 10,
    };

    try {
        query = await commentsQuerySchema.validateAsync(query);
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

async function searchUserCommentsInDatabase(userId, query, database) {
    try {
        const comments = await database.getUserCommentsList({
            userId,
            ...query,
        });

        return [null, comments];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getUserComments;
