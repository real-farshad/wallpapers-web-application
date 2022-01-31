const handleError = require("./utils/handleError");
const validatePostId = require("./validation/validatePostId");
const checkPostExists = require("./utils/checkPostExists");
const checkPostAlreadyLiked = require("./utils/checkPostAlreadyLiked");

async function createNewLike(req, res, next, database) {
    const userId = req.user._id;
    const postId = req.params.id;

    let err = validatePostId(postId);
    if (err) return handleError(err, res, next);

    err = await checkPostExists(postId, database);
    if (err) return handleError(err, res, next);

    err = await checkPostAlreadyLiked(postId, userId, database);
    if (err) return handleError(err, res, next);

    const like = {
        postId,
        userId,
        createdAt: Date.now(),
    };

    err = await addNewLikeToDatabase(like, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function addNewLikeToDatabase(like, database) {
    try {
        await database.addNewLike(like);
        await database.incrementLikeCount(like.postId);
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = createNewLike;
