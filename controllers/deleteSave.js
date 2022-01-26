const validateId = require("../utils/validateId");

// DELETE /:id
async function deleteSave(req, res, next, database) {
    const isValidId = validateId(req.params.id);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        const result = await database.findAndDeleteSave({
            postId: req.params.id,
            userId: req.user._id,
        });

        if (!result) {
            return res.status(404).json({
                error: "no save with this id, for this user, was found!",
            });
        }

        return res.json({ saveDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = deleteSave;
