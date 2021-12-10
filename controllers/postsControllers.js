const validateId = require("../utils/validateId");
const { postSchema, postQuerySchema } = require("../schemas/postsSchemas");

// GET /
async function getPostsList(req, res, next, database) {
    // process query
    let query = {
        search: req.query.search || "",
        category: req.query.category || "",
        period: req.query.period || "",
        sort: req.query.sort || "new",
        page: req.query.page || 1,
        limit: req.query.limit || 20,
    };

    try {
        // validate query
        query = await postQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate category and replace it with categoryId
    query.categoryId = "";
    if (query.category !== "") {
        try {
            const category = await database.findCategoryByTitle(query.category);

            if (!category) {
                return res.status(404).json({
                    error: "this category does not exist",
                });
            }

            query.categoryId = category._id;
        } catch (err) {
            next(err);
        }
    }

    // calculate period in milliseconds if it's not empty
    if (query.period === "weekly") {
        const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        query.period = Date.now() - weekInMilliseconds;
    } else if (query.period === "monthly") {
        const monthInMilliseconds = 30 * 7 * 24 * 60 * 60 * 1000;
        query.period = Date.now() - monthInMilliseconds;
    } else if (query.period === "yearly") {
        const yearInMilliseconds = 365 * 30 * 7 * 24 * 60 * 60 * 1000;
        query.period = Date.now() - yearInMilliseconds;
    }

    // translate sort order to it's related post document field
    let sort = query.sort === "new" ? "createdAt" : "likeCount";

    // reverse sort order to show newest and most popular first
    sort = { [sort]: -1 };

    const { search, categoryId, period, page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // search and return related documents in database
        const postsList = await database.searchPostsList(
            search,
            categoryId,
            sort,
            period,
            skip,
            limit
        );

        return res.json(postsList);
    } catch (err) {
        next(err);
    }
}

// GET /:id
async function getSinglePost(req, res, next, database) {
    const postId = req.params.id;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find post
        const post = await database.findPostById(postId);

        if (!post) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        // return post
        return res.json(post);
    } catch (err) {
        next(err);
    }
}

// POST /
// body.request => imageUrl, title, category
async function createNewPost(req, res, next, database) {
    let newPost = req.body;

    // validate request body
    try {
        newPost = await postSchema.validateAsync(newPost);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    try {
        // make sure the category exists in the database
        const category = await database.findCategoryByTitle(newPost.category);

        if (!category) {
            return res.status(404).json({
                error: "this category does not exist",
            });
        }

        delete newPost.category;
        newPost.categoryId = category._id;
    } catch (err) {
        return next(err);
    }

    // add extra properties
    newPost.likeCount = 0;
    newPost.createdAt = Date.now();
    newPost.publisherId = req.user._id;

    try {
        // insert new document into the database
        await database.addNewPost(newPost);

        // return sucess
        return res.json({ newPostCreated: true });
    } catch (err) {
        next(err);
    }
}

// PUT /:id
// body.request => imageUrl, title, category
async function updatePost(req, res, next, database) {
    const postId = req.params.id;
    let updatedPost = req.body;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // validate request body
        updatedPost = await postSchema.validateAsync(updatedPost);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    try {
        // make sure the category exists in the database
        const category = await database.findCategoryByTitle(updatedPost.category);

        if (!category) {
            return res.status(404).json({
                error: "this category does not exist",
            });
        }

        delete updatedPost.category;
        updatedPost.categoryId = category._id;
    } catch (err) {
        next(err);
    }

    try {
        // find and update the post
        const result = await database.findAndUpdatePostById(postId, updatedPost);

        if (!result) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        // return success
        return res.json({ postUpdated: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deletePost(req, res, next, database) {
    const postId = req.params.id;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // delete related likes
    await database.deleteManyLikesByPostId(postId);

    // delete related comments
    await database.deleteManyCommentsByPostId(postId);

    // delete related saves
    await database.deleteManySavesByPostId(postId);

    // delete related collection posts
    await database.deleteManycollectionPostsByPostId(postId);

    try {
        // find and delete post
        const result = await database.findAndDeletePostById(postId);

        if (!result) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        // return success
        return res.json({ postDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getPostsList,
    getSinglePost,
    createNewPost,
    updatePost,
    deletePost,
};
