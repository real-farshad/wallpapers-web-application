const { commentsQuerySchema } = require("../schemas/commentsSchemas");
const handleError = require("./utils/handleError");

// GET /
async function getUserComments(req, res, next, database) {
    let [err, params] = await validateQueryParams(req.query);
    if (err) return handleError(err, res, next);

    params = formatParams(params);

    try {
        const userComments = await database.getUserCommentsList({
            userId,
            skip,
            limit,
        });

        return res.json(userComments);
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
        params = await commentsQuerySchema.validateAsync(params);
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

module.exports = getUserComments;
