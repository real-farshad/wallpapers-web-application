const validateId = require("../utils/validateId");
const { likeSchema, likesQuerySchema } = require("../schemas/likesSchemas");

// GET /
async function getUserLikes(req, res, next, database) {
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 20,
    };

    const userId = req.user._id;

    // validate query
    try {
        query = await likesQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // find and return user liked posts
        const userLikedPosts = await database.getUserLikes(userId, skip, limit);
        return res.json(userLikedPosts);
    } catch (err) {
        next(err);
    }
}

// GET /:id
async function checkLike(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find a like with these post and user ids
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
async function createNewLike(req, res, next, database) {
    let newLike = req.body;

    // validate request body
    try {
        newLike = await likeSchema.validateAsync(newLike);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post id
    const isValidId = validateId(newLike.postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // set extra fields for like
    newLike.userId = req.user._id;
    newLike.createdAt = Date.now();

    try {
        // make sure there is a post with this id in the database
        const post = await database.findPostById(newLike.postId);

        if (!post) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        // check if post has already been liked
        const previousPostLike = await database.findOnePostLike(
            newLike.postId,
            newLike.userId
        );

        if (previousPostLike) {
            return res.status(403).json({
                error: "post has already been liked!",
            });
        }

        // add like to likes collection
        await database.addNewLike(newLike);

        // increment post likeCount
        await database.incrementLikeCount(newLike.postId);

        // return success
        return res.json({ postLiked: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deleteLike(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find and delete like from likes collection
        const result = await database.findAndDeleteLike(postId, userId);

        if (!result) {
            return res.status(404).json({
                error: "no like with this id, for this user, was found!",
            });
        }

        // decrement post likeCount
        await database.decrementLikeCount(postId);

        // return success
        return res.json({ likeDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserLikes,
    checkLike,
    createNewLike,
    deleteLike,
};
