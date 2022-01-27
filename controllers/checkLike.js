const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// GET /:id
async function checkLike(req, res, next, database) {
    const err = validatePostId(req.params.id);
    if (err) return handleError(err, res, next);

    try {
        const result = await database.findOnePostLike({
            postId: req.params.id,
            userId: req.user._id,
        });

        if (!result) {
            return res.json({
                isLiked: false,
            });
        }

        return res.json({ isLiked: true });
    } catch (err) {
        return next(err);
    }
}

module.exports = checkLike;
