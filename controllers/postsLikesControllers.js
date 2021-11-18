const { ObjectId } = require("mongodb");
const { postLikeSchema } = require("../schemas/postsLikesSchemas");

// POST /
// req.body => post_id
async function createNewPostLike(req, res, next, database) {
    // validate request's body
    try {
        await postLikeSchema.validateAsync(req.body);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post's id
    if (!ObjectId.isValid(req.body.post_id)) {
        return res.status(403).json({
            error: "invalid post id!",
        });
    }

    // create like object
    const like = {
        ...req.body,
        user_id: req.user._id,
    };

    try {
        // check if post has already been liked
        const postLike = await database.findOnePostLike(like);
        if (postLike) {
            return res.status(403).json({ error: "post has already been liked!" });
        }

        // add like to post likes collection
        await database.addNewPostLike(like);

        // increment post's like count
        await database.incrementPostLikeCount(req.body.post_id);

        // return success
        return res.json({ postLiked: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deletePostLike(req, res, next, database) {
    // validate post's id
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(403).json({
            error: "invalid post id!",
        });
    }

    try {
        // find and delete like from post likes collection
        const result = await database.findAndDeletePostLike(req.params.id, req.user._id);

        if (!result) {
            return res.status(404).json({
                error: "no post like with this id was found!",
            });
        }

        // decrement post's like count
        await database.decrementPostLikeCount(req.params.id);

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
