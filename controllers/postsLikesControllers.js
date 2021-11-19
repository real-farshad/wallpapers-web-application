const { ObjectId } = require("mongodb");
const { postLikeSchema } = require("../schemas/postsLikesSchemas");

// POST /
// req.body => post_id
async function createNewPostLike(req, res, next, database) {
    let newLike = req.body;

    // validate request's body
    try {
        newLike = await postLikeSchema.validateAsync(newLike);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post's id
    if (!ObjectId.isValid(newLike.post_id)) {
        return res.status(403).json({
            error: "invalid post id!",
        });
    }

    // add user's id
    newLike.user_id = req.user._id;

    try {
        // check if post has already been liked
        const previousPostLike = await database.findOnePostLike(
            newLike.post_id,
            newLike.user_id
        );

        if (previousPostLike) {
            return res.status(403).json({
                error: "post has already been liked!",
            });
        }

        // add like to post likes collection
        await database.addNewPostLike(newLike);

        // increment post's like count
        await database.incrementPostLikeCount(newLike.post_id);

        // return success
        return res.json({ postLiked: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deletePostLike(req, res, next, database) {
    const postId = req.params.id;

    // validate post's id
    if (!ObjectId.isValid(postId)) {
        return res.status(403).json({
            error: "invalid post id!",
        });
    }

    try {
        // find and delete like from post likes collection
        const result = await database.findAndDeletePostLike(postId, req.user._id);

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
    createNewPostLike,
    deletePostLike,
};
