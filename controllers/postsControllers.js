const { postSchema, postQuerySchema } = require("../schemas/postsSchemas");
const { ObjectId } = require("mongodb");

// GET /
async function getPostsList(req, res, next, database) {
    // process query
    let query = {
        search: req.query.search || "",
        category: req.query.category || "",
        sort: req.query.sort || "new",
        page: req.query.page || 1,
        limit: req.query.limit || 20,
    };

    try {
        // validate query
        await postQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate category
    if (query.category !== "") {
        try {
            const category = await database.findCategoryByTitle(query.category);

            if (!category) {
                return res.status(404).json({ error: "this category does not exist" });
            }

            delete query.category;
            query.category_id = category._id;
        } catch (err) {
            next(err);
        }
    }

    // translate sort order to it's related post document field
    let sort = query.sort === "new" ? "publish_date" : "like_count";

    // reverse sort order to show newest and most popular first
    sort = { [sort]: -1 };

    const { search, category_id, page, limit } = query;
    const skip = (page - 1) * 4;

    try {
        // search for related documents in db and return list of related posts
        const postsList = await database.searchPostsList({
            search,
            category_id,
            sort,
            skip,
            limit,
        });

        return res.json(postsList);
    } catch (err) {
        next(err);
    }
}

// POST /
// body.request => image_url, title, category_id
async function createNewPost(req, res, next, database) {
    // validate request's body
    try {
        await postSchema.validateAsync(req.body);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    try {
        // make sure the category exists in the database
        const category = await database.findCategoryByTitle(req.body.category);

        if (!category) {
            return res.status(404).json({ error: "this category does not exist" });
        }

        delete req.body.category;
        req.body.category_id = category._id;
    } catch (err) {
        next(err);
    }

    // add extra properties
    const newPost = {
        ...req.body,
        like_count: 0,
        comment_count: 0,
        download_count: 0,
        publish_date: Date.now(),
        // publisher: --current user--
    };

    try {
        // insert new document into the database
        const newPostId = await database.addNewPost(newPost);

        // return number of inserted posts
        return res.json({ newPostId });
    } catch (err) {
        next(err);
    }
}

// PUT /:id
// body.request => image_url, title, category_id
async function updatePost(req, res, next, database) {
    try {
        // validate request's body
        await postSchema.validateAsync(req.body);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post id
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(403).json({ error: "invalid post id!" });
    }

    try {
        // make sure the category exists in the database
        const category = await database.findCategoryByTitle(req.body.category);

        if (!category) {
            return res.status(404).json({ error: "this category does not exist" });
        }

        delete req.body.category;
        req.body.category_id = category._id;
    } catch (err) {
        next(err);
    }

    try {
        // update the post
        const [matchedCount, modifiedCount] = await database.updatePostById(
            req.params.id,
            req.body
        );

        if (matchedCount !== 1) {
            return res.status(404).json({ error: "no post with this id was found!" });
        }

        // return modified posts count
        return res.json({ modifiedPostsCount: modifiedCount });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deletePost(req, res, next, database) {
    // validate post id
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(403).json({ error: "invalid post id!" });
    }

    try {
        // delete the post
        const deletedCount = await database.deletePostById(req.params.id);

        if (deletedCount !== 1) {
            return res.status(404).json({ error: "no post with this id was found!" });
        }

        // return deleted posts count
        return res.json({ deletedCount });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getPostsList,
    createNewPost,
    updatePost,
    deletePost,
};
