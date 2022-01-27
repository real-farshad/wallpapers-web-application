const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// DELETE /:id
async function deleteSave(req, res, next, database) {
    const err = validatePostId(req.params.id);
    if (err) return handleError(err, res, next);

    try {
        const success = await database.findAndDeleteSave({
            postId: req.params.id,
            userId: req.user._id,
        });

        if (!success) {
            return res.status(404).json({
                error: "no save with this id, for this user, was found!",
            });
        }

        return res.json({ saveDeleted: true });
    } catch (err) {
        return next(err);
    }
}

module.exports = deleteSave;
