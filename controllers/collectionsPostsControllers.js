const validateId = require("../utils/validateId");
const {
    collectionPostSchema,
    collectionsPostsSchemas,
} = require("../schemas/collectionsPostsSchemas");

// GET /:id
// req.query => page, skip
async function getCollectionPosts(req, res, next, database) {
    const collectionId = req.params.id;
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };

    // validate collection id
    const isValidId = validateId(collectionId);
    if (!isValidId) return res.status(403).json({ error: "invalid collection id!" });

    // validate query
    try {
        query = await collectionsPostsSchemas.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // find and return collection posts
        const collectionPosts = await database.findCollectionPosts(
            collectionId,
            skip,
            limit
        );

        const posts = [];
        for (let collectionPost of collectionPosts) {
            posts.push(collectionPost.post);
        }

        return res.json(posts);
    } catch (err) {
        next(err);
    }
}

// POST /
// req.body => collectionId, postId
async function createNewCollectionPost(req, res, next, database) {
    let newCollectionPost = req.body;
    const userId = req.user._id;

    // validate request body
    try {
        newCollectionPost = await collectionPostSchema.validateAsync(newCollectionPost);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // set extra fields for new collection post
    newCollectionPost.createdAt = Date.now();

    try {
        // make sure post exists
        const post = await database.findPostById(newCollectionPost.postId);

        if (!post) {
            return res.status(404).json({
                error: "no post with this id, exits!",
            });
        }

        // make sure collection exists and belongs to this user
        const collection = await database.findCollectionById(
            newCollectionPost.collectionId
        );

        if (!collection || collection.userId !== userId) {
            return res.status(404).json({
                error: "no collection with this id, for this user, exits!",
            });
        }

        // add new collection post to database
        await database.addNewCollectionPost(newCollectionPost);

        // increment collection post count
        await database.incrementCollectionPostCount(newCollectionPost.collectionId);

        // return success
        return res.json({ newCollectionPostAdded: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deleteCollectionPost(req, res, next, database) {
    const collectionPostId = req.params.id;
    const userId = req.user._id;

    // validate collection id
    const isValidId = validateId(collectionPostId);
    if (!isValidId) return res.status(403).json({ error: "invalid collection post id!" });

    try {
        // make sure collection post exists
        const collectionPost = await database.findCollectionPostById(collectionPostId);

        if (!collectionPost) {
            return res.status(404).json({
                error: "no collection post with this id was found!",
            });
        }

        // make sure collection post belongs to a collection made by this user
        const collection = await database.findCollectionById(collectionPost.collectionId);

        if (!collection || collection.userId !== userId) {
            return res.status(404).json({
                error: "no collection with this id, for this user, was found!",
            });
        }

        // delete collection post
        await database.deleteCollectionPostById(collectionPostId);

        // decrement collection post count
        await database.decrementCollectionPostCount(collectionPost.collectionId);

        // return success
        return res.json({ collectionPostDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCollectionPosts,
    createNewCollectionPost,
    deleteCollectionPost,
};
