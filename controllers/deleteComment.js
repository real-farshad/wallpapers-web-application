const handleError = require("./utils/handleError");
const validateCommentId = require("./validation/validateCommentId");

async function deleteComment(req, res, next, database) {
    const userId = req.user._id,
    const commentId = req.params.id;

    let err = validateCommentId(commentId);
    if (err) return handleError(err, res, next);

    err = await deleteCommentFromDatabase(commentId, userId, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function deleteCommentFromDatabase(commentId, userId, database) {
    try {
        const success = await database.findAndDeleteComment({
            commentId,
            userId,
        });

        if (!success) {
            return res.status(404).json({
                error: "no comment with this id, for this user, was found!",
            });
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = deleteComment;
