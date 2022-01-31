const handleError = require("./utils/handleError");
const validatePostId = require("./validation/validatePostId");

async function deletePost(req, res, next, database) {
    const userId = req.user._id;
    const postId = req.params.id;

    let err = validatePostId(postId);
    if (err) return handleError(err, res, next);

    err = await deletePostFromDatabase(postId, userId, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function deletePostFromDatabase(postId, userId, database) {
    try {
        const success = await database.findAndDeletePostById(postId, userId);
        if (!success) {
            const knownError = {
                known: true,
                status: 404,
                message: "no post with this id, for this user, was found!",
            };

            return knownError;
        }

        await database.deleteManyLikesByPostId(postId);
        await database.deleteManyCommentsByPostId(postId);
        await database.deleteManySavesByPostId(postId);
        await database.deleteManycollectionPostsByPostId(postId);

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = deletePost;
