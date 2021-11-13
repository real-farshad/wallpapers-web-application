const { postQuerySchema } = require("../schemas/postsSchemas");

// GET /
async function getPostsController(database, req, res, next) {
    // process query
    let query = {
        search: req.query.search || "",
        category: req.query.category || "",
        sort: req.query.sort || "new",
        page: req.query.page || 1,
        limit: req.query.limit || 20,
    };

    // validate query
    try {
        query = await postQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate category \\ after adding categories routes //

    // translate sort order to it's related post document field
    let sort = query.sort === "new" ? "publish_date" : "views";

    // reverse sort order to show newest and most popular first
    sort = { [sort]: -1 };

    const { search, category, page, limit } = query;
    const skip = (page - 1) * 4;

    // search for related documents in db and return list of related posts
    try {
        const postsList = await database.getPostsList({
            search,
            category,
            sort,
            skip,
            limit,
        });

        return res.json(postsList);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getPostsController,
};
