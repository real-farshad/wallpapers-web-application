const { commentsQuerySchema } = require("../schemas/commentsSchemas");
const validatePostId = require("./utils/validatePostId");
const checkPostExists = require("./utils/checkPostExists");
const handleError = require("./utils/handleError");
const replacePageWithSkip = require("./utils/replacePageWithSkip");

async function getPostComments(req, res, next, database) {
    const postId = req.params.id;
    let query = req.query;

    let err;
    [err, query] = await validateQuery(query);
    if (err) return handleError(err, res, next);

    err = await validatePost(postId, database);
    if (err) return handleError(err, res, next);

    query = replacePageWithSkip(query);

    let comments;
    [err, comments] = await searchPostCommentsInDatabase(
        postId,
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

async function validatePost(postId, database) {
    let err = validatePostId(postId);
    if (err) return err;

    const err = await checkPostExists(postId, database);
    if (err) return err;

    return null;
}

async function searchPostCommentsInDatabase(postId, query, database) {
    try {
        const comments = await database.getCommentsList(postId, query);
        return [null, comments];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getPostComments;
