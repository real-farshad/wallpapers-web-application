const handleError = require("./utils/handleError");
const validatePostId = require("./validation/validatePostId");
const checkPostExists = require("./utils/checkPostExists");

async function deleteLike(req, res, next, database) {
    const userId = req.user._id;
    const postId = req.params.id;

    let err = validatePostId(postId);
    if (err) return handleError(err, res, next);

    err = await checkPostExists(postId, database);
    if (err) return handleError(err, res, next);

    err = await deleteLikeFromDatabase(postId, userId, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function deleteLikeFromDatabase(postId, userId, database) {
    try {
        const success = await database.findAndDeleteLike({
            postId,
            userId,
        });

        if (!success) {
            const knownError = {
                known: true,
                status: 404,
                message: "no like with this id, for this user, was found!",
            };

            return knownError;
        }

        await database.decrementLikeCount(postId);

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = deleteLike;
