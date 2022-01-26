const validateId = require("../utils/validateId");

// DELETE /:id
async function deletePost(req, res, next, database) {
    const isValidPostId = validateId(postId);
    if (!isValidPostId) {
        return res.status(403).json({
            error: "invalid post id!",
        });
    }

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
        next(err);
    }
}

module.exports = deletePost;
