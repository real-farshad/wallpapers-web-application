const validateId = require("../utils/validateId");

// DELETE /:id
async function deleteComment(req, res, next, database) {
    const isValidId = validateId(req.params.id);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        const result = await database.findAndDeleteComment({
            postId: req.params.id,
            userId: req.user._id,
        });

        if (!result) {
            return res.status(404).json({
                error: "no comment with this id, for this user, was found!",
            });
        }

        return res.json({ commentDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = deleteComment;
