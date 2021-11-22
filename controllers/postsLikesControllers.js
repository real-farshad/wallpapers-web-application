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
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // find and return user liked posts
        const userLikedPosts = await database.getUserLikedPosts(userId, skip, limit);
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
                isLiked: false,
            });
        }

        // return result to see if the post has been liked
        return res.json({ isLiked: true });
    } catch (err) {
        next(err);
    }
}

// POST /
// req.body => postId
async function createNewPostLike(req, res, next, database) {
    let newPostLike = req.body;

    // validate request body
    try {
        newPostLike = await postLikeSchema.validateAsync(newPostLike);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post id
    const isValidId = validateId(newPostLike.postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // set extra fields for post like
    newPostLike.userId = req.user._id;
    newPostLike.createdAt = Date.now();

    try {
        // make sure there is a post with this id in the database
        const post = await database.findPostById(newPostLike.postId);
        if (!post) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

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

        // increment post like count
        await database.incrementPostLikeCount(newPostLike.postId);

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

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find and delete post like from post likes collection
        const result = await database.findAndDeletePostLike(postId, userId);

        if (!result) {
            return res.status(404).json({
                error: "no post like with this id, for this user, was found!",
            });
        }

        // decrement post like count
        await database.decrementPostLikeCount(postId);

        // return success
        return res.json({ likeDeleted: true });
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
