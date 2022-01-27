const { postQuerySchema } = require("../schemas/postsSchemas");
const handleError = require("./utils/handleError");

// GET /
async function getPostsList(req, res, next, database) {
    let [err, params] = await validateQueryParams(req.query, database);
    if (err) return handleError(err, res, next);

    params = formatParams(params);

    try {
        const postsList = await database.searchPostsList(...params);
        return res.json(postsList);
    } catch (err) {
        return next(err);
    }
}

async function validateQueryParams(queryParams, database) {
    const params = {
        search: queryParams.search || "",
        category: queryParams.category || "",
        duration: queryParams.duration || "",
        sort: queryParams.sort || "new",
        page: queryParams.page || 1,
        limit: queryParams.limit || 20,
    };

    try {
        query = await postQuerySchema.validateAsync(params);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }

    if (params.category) {
        try {
            const category = await database.findCategoryByTitle(
                params.category
            );

            if (!category) {
                const knownError = {
                    known: true,
                    status: 404,
                    message: "this category does not exist",
                };

                return [knownError, null];
            } else {
                params.categoryId = category._id;
                delete params.category;
            }
        } catch (err) {
            return [err, null];
        }
    }

    return [null, params];
}

function formatParams(params) {
    const fParams = { ...params };

    if (fParams.duration !== "all-times") {
        fParams.duration = new Date(`1-1-${fParams.duration}`).getTime();
    }

    fParams.sort = fParams.sort === "new" ? "createdAt" : "likeCount";
    fParams.sort = { [fParams.sort]: -1 };

    fParams.skip = (fParams.page - 1) * fParams.limit;
    delete fParams.page;

    return fParams;
}

module.exports = getPostsList;
