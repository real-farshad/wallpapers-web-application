const { postQuerySchema } = require("../schemas/postsSchemas");
const findCategoryByTitleInDatabase = require("./utils/findCategoryByTitleInDatabase");
const handleError = require("./utils/handleError");
const replacePageWithSkip = require("./utils/replacePageWithSkip");

async function getPostsList(req, res, next, database) {
    let query = req.query;

    let err;
    [err, query] = await validateQuery(query, database);
    if (err) return handleError(err, res, next);

    query = formatQuery(query);

    let posts;
    [err, posts] = await searchPostsInDatabase(query, database);
    if (err) return handleError(err, res, next);

    return res.json(posts);
}

async function validateQuery(queryObject, database) {
    let query = {
        search: queryObject.search || "",
        category: queryObject.category || "",
        duration: queryObject.duration || "",
        sort: queryObject.sort || "new",
        page: queryObject.page || 1,
        limit: queryObject.limit || 20,
    };

    try {
        query = await postQuerySchema.validateAsync(query);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }

    if (query.category !== "") {
        const [err, category] = await findCategoryByTitleInDatabase(
            query.category,
            database
        );

        if (err) return [err, null];

        query.categoryId = category._id;
        delete query.category;
    }

    return [null, query];
}

function formatQuery(queryObject) {
    let query = { ...queryObject };

    if (query.duration !== "all-times") {
        query.duration = new Date(`1-1-${query.duration}`).getTime();
    }

    query.sort = query.sort === "new" ? "createdAt" : "likeCount";
    query.sort = { [query.sort]: -1 };

    query = replacePageWithSkip(query);

    return query;
}

async function searchPostsInDatabase(query, database) {
    try {
        const posts = await database.searchPostsList(...query);
        return [null, posts];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getPostsList;
