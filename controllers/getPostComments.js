const { commentsQuerySchema } = require("../schemas/commentsSchemas");
const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// GET /:id
async function getPostComments(req, res, next, database) {
    let [queryParamsError, params] = await validateQueryParams(req.query);
    if (queryParamsError) return handleError(queryParamsError, res, next);

    const postIdError = validatePostId(req.params.id);
    if (postIdError) return handleError(postIdError, res, next);

    const postError = await validatePost(req.params.id, database);
    if (postError) return handleError(postError, res, next);

    params = formatParams(params);

    try {
        const comments = await database.getCommentsList(postId, skip, limit);
        return res.json(comments);
    } catch (err) {
        return next(err);
    }
}

async function validateQueryParams(queryParams) {
    let params = {
        page: queryParams.page || 1,
        limit: queryParams.limit || 10,
    };

    try {
        query = await commentsQuerySchema.validateAsync(params);
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

async function validatePost(postId, database) {
    try {
        const post = await database.findPostById(postId);
        if (!post) {
            const knownError = {
                known: true,
                status: 404,
                message: "no post with this id was found!",
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

module.exports = getPostComments;
