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
        return res.status(403).json({ error: "invalid post id!" });
    }

    // create like object
    const like = {
        ...req.body,
        // user_id: -- current user's id here ---
    };

    try {
        // add like to post likes collection
        const likeId = await database.addNewPostLike(like);

        // increment post's like count
        await database.incrementPostLikeCount(req.body.post_id);

        // return new post like's id
        return res.json({ likeId });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deletePostLike(req, res, next, database) {
    // validate post's id
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(403).json({ error: "invalid post id!" });
    }

    // delete like from post likes collection
    try {
        const deletedLikesCount = await database.deletePostLikeById({
            post_id: req.params.id,
            // user_id: -- current user's id
        });

        if (deletedLikesCount !== 1) {
            return res.status(404).json({ err: "no post like with this id was found!" });
        }

        // decrement post's like count
        await database.decrementPostLikeCount(req.params.id);

        // return deleted post like count
        return res.json({ deletedLikesCount });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNewPostLike,
    deletePostLike,
};
