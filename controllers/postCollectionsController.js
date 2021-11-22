const validateId = require("../utils/validateId");
const {
    createPostCollectionSchema,
    addToPostCollectionSchema,
    postCollectionQuerySchema,
} = require("../schemas/postCollectionsSchemas");

// GET /
// req.query => page, limit
async function getPostCollectionsPreview(req, res, next, database) {
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 3,
    };

    // validate query
    try {
        query = await postCollectionQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // find and return user liked posts
        const collections = await database.findPostCollections(skip, limit);
        return res.json(collections);
    } catch (err) {
        next(err);
    }
}

// GET /:id
// req.query => page, limit
async function getPostCollectionPosts(req, res, next, database) {
    const collectionId = req.params.id;
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };

    // validate query
    try {
        query = await postCollectionQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // make sure collection exists
        const postCollection = await database.findPostCollectionById(postCollectionId);

        if (!postCollection) {
            return res.status(404).json({
                error: "no collection with this id was found",
            });
        }

        // find and return post collection posts
        const collectionPosts = await database.findPostCollectionPosts(skip, limit);
        return res.json(collectionPosts);
    } catch (err) {
        next(err);
    }
}

// GET /:id
// req.query => page, limit
async function getUserPostCollections(req, res, next, database) {
    const userId = req.user._id;

    // validate query
    try {
        query = await postCollectionQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // make sure collection exists
        const postCollection = await database.findPostCollectionById(postCollectionId);

        if (!postCollection) {
            return res.status(404).json({
                error: "no collection with this id was found",
            });
        }

        // find and return user post collections
        const collectionPosts = await database.findUserPostCollections(skip, limit);
        return res.json(collectionPosts);
    } catch (err) {
        next(err);
    }
}

// POST
// req.body => title
async function createPostCollection(req, res, next, database) {
    let newPostCollection = req.body;

    // validate body request
    try {
        newPostCollection = await createPostCollectionSchema.validateAsync(
            newPostCollection
        );
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // set extra fields for post collection
    newPostCollection.userId = req.user._id;
    newPostCollection.createdAt = req.user._id;

    try {
        // add new collection to database
        await database.addNewPostCollection(newPostCollection);

        // return success
        return res.json({ newCollectionCreated: true });
    } catch (err) {
        next(err);
    }
}

// POST
// req.body => postsList: [{ postId }]
async function addNewPostToCollection(req, res, next, database) {
    let { items } = req.body;

    // validate body request
    try {
        items = await addToPostCollectionSchema.validateAsync(items);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post ids
    for (let item of items) {
        const isValidId = validateId(item.postId);
        if (!isValidId) {
            return res.status(403).json({
                error: `invalid post id:${item.postId}`,
            });
        }

        // set extra fields for item
        item.createdAt = Date.now();
    }

    try {
        // make sure there are posts with these ids
        for (let item of items) {
            const post = await database.findPostById(item.postId);
            if (!post)
                return res
                    .status(404)
                    .json({ error: `no post with id:${item.postId} was found!` });
        }

        // add new posts to collection
        await database.addManyPostsToCollection(items);

        // return success
        return res.json({ newPostsAddedToCollection: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deletePostCollection(req, res, next, database) {
    const collectionId = req.params.id;
    const userId = req.user._id;

    // validate collection id
    const isValidId = validateId(collectionId);
    if (!isValidId) return res.status(403).json({ error: `invalid collection id!` });

    try {
        // find and delete post collection
        const result = await database.findAndDeletePostCollection(collectionId, userId);

        if (!result) {
            return res.status(404).json({
                error: "no post collection with this id, for this user, was found!",
            });
        }

        // return success
        return res.json({ collectionDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getPostCollectionsPreview,
    getPostCollectionPosts,
    getUserPostCollections,
    createPostCollection,
    addNewPostToCollection,
    deletePostCollection,
};
