const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// GET /:id
async function checkSave(req, res, next, database) {
    const err = validatePostId(req.params.id);
    if (err) return handleError(err, res, next);

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
        return next(err);
    }
}

module.exports = checkSave;
