const validateId = require("./utils/validateId");
const handleError = require("./utils/handleError");

// DELETE /:id
async function deleteComment(req, res, next, database) {
    const err = validateCommentId(req.params.id);
    if (err) return handleError(err, res, next);

    try {
        const success = await database.findAndDeleteComment({
            postId: req.params.id,
            userId: req.user._id,
        });

        if (!success) {
            return res.status(404).json({
                error: "no comment with this id, for this user, was found!",
            });
        }

        return res.json({ commentDeleted: true });
    } catch (err) {
        return next(err);
    }
}

function validateCommentId(commentId) {
    const isValidId = validateId(commentId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 403,
            message: "invalid post id!",
        };

        return knownError;
    } else {
        return null;
    }
}

module.exports = deleteComment;
