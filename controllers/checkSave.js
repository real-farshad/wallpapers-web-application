const validateId = require("../utils/validateId");

// GET /:id
async function checkSave(req, res, next, database) {
    const isValidId = validateId(req.params.id);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        const save = await database.findOneSave({
            postId: req.params.id,
            userId: req.user._id,
        });

        if (!save) {
            return res.json({
                isSaved: false,
            });
        }

        return res.json({ isSaved: true });
    } catch (err) {
        next(err);
    }
}

module.exports = checkSave;
