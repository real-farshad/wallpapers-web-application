const validateLike = require("../../validation/like");

async function createLike(newLike, userId, db) {
    let [err, like] = await validateLike(newLike);
    if (err) return { known: true, status: 400, message: err.message };

    let post;
    [err, post] = await db.findPostById(like.postId);
    if (err) return err;

    if (!post) {
        return {
            known: true,
            status: 400,
            message: "a post with this id doesn't exist!",
        };
    }

    let previousLike;
    [err, previousLike] = await db.findUserLike(like.postId, userId);
    if (err) return err;

    if (previousLike) {
        return {
            known: true,
            status: 400,
            message: "post has already been liked!",
        };
    }

    err = await db.saveLike(like);
    if (err) return err;

    return null;
}

module.exports = createLike;
