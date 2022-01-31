const handleError = require("./utils/handleError");
const validatePostId = require("./validation/validatePostId");

async function checkLike(req, res, next, database) {
    const userId = req.user._id;
    const postId = req.params.id;

    let err = validatePostId(postId);
    if (err) return handleError(err, res, next);

    let like;
    [err, like] = await findUserLikeInDatabase(userId, postId, database);
    if (err) return handleError(err, res, next);

    if (!like) return res.json({ liked: false });
    return res.json({ liked: true });
}

async function findUserLikeInDatabase(postId, userId, database) {
    try {
        const like = await database.findOnePostLike({ userId, postId });
        return [null, like];
    } catch (err) {
        return [err, null];
    }
}

module.exports = checkLike;
