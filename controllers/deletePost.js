const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// DELETE /:id
async function deletePost(req, res, next, database) {
    const err = validatePostId(req.params.id);
    if (err) return handleError(err, res, next);

    await database.deleteManyLikesByPostId(postId);
    await database.deleteManyCommentsByPostId(postId);
    await database.deleteManySavesByPostId(postId);
    await database.deleteManycollectionPostsByPostId(postId);

    try {
        const success = await database.findAndDeletePostById(postId);
        if (!success) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        return res.json({ postDeleted: true });
    } catch (err) {
        return next(err);
    }
}

module.exports = deletePost;
