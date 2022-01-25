const validateId = require("../utils/validateId");
const { commentsQuerySchema } = require("../schemas/commentsSchemas");
const handleError = require("../utils/handleError");

// GET /:id
async function getPostComments(req, res, next, database) {
    let [err, params] = await validateQueryParams(req.query);
    if (err) return handleError(err, res, next);

    err = await validatePostId(req.params.id, database);
    if (err) return handleError(err, res, next);

    params = formatParams(params);

    try {
        // find related comments
        const comments = await database.getCommentsList(postId, skip, limit);
        return res.json(comments);
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

async function validatePostId(postId, database) {
    const isValidId = validateId(postId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 403,
            message: "invalid post id!",
        };

        return knownError;
    }

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
