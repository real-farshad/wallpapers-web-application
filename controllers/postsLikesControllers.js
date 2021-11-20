const validateId = require("../utils/validateId");
const { postLikeSchema, likedPostsQuery } = require("../schemas/postsLikesSchemas");

// GET /
async function getLikedPostsList(req, res, next, database) {
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 20,
    };
    const userId = req.user._id;

    // validate query
    try {
        query = await likedPostsQuery.validateAsync(query);
    } catch (err) {
        return next(err);
    }

    const { page, limit } = query;
    const skip = (page - 1) * 20;

    try {
        // get user's liked posts
        const userLikedPosts = await database.getUserLikedPosts(userId, skip, limit);

        // return liked posts
        return res.json(userLikedPosts);
    } catch (err) {
        next(err);
    }
}

// GET /:id
async function getPostLike(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find post like with these post and user ids
        const result = await database.findOnePostLike(postId, userId);

        if (!result) {
            return res.json({
                hasLiked: false,
            });
        }

        // return success if post like exists and failure if it doesn't
        return res.json({ hasLiked: true });
    } catch (err) {
        next(err);
    }
}

// POST /
// req.body => postId
async function createNewPostLike(req, res, next, database) {
    let newPostLike = req.body;

    // validate post's id
    const isValidId = validateId(newPostLike.postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // validate request's body
    try {
        newPostLike = await postLikeSchema.validateAsync(newPostLike);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // add user's id to post like
    newPostLike.userId = req.user._id;

    try {
        // check if post has already been liked
        const previousPostLike = await database.findOnePostLike(
            newPostLike.postId,
            newPostLike.userId
        );

        if (previousPostLike) {
            return res.status(403).json({
                error: "post has already been liked!",
            });
        }

        // add like to post likes collection
        await database.addNewPostLike(newPostLike);

        // increment post's like count
        await database.incrementPostLikeCount(postId);

        // return success
        return res.json({ postLiked: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deletePostLike(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate post's id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find and delete like from post likes collection
        const result = await database.findAndDeletePostLike(postId, userId);

        if (!result) {
            return res.status(404).json({
                error: "no post like with this id was found!",
            });
        }

        // decrement post's like count
        await database.decrementPostLikeCount(postId);

        // return success
        return res.json({ postLikeDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getLikedPostsList,
    getPostLike,
    createNewPostLike,
    deletePostLike,
};
