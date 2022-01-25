const validateId = require("../utils/validateId");

// GET /:id
async function checkLike(req, res, next, database) {
    const err = validatePostId(req.params.id);
    if (err) return res.status(err.status).message(err.message);

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

        // return result to see if the post has been liked
        return res.json({ isLiked: true });
    } catch (err) {
        next(err);
    }
}

async function validatePostId(postId) {
    const isValidId = validateId(postId);
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

module.exports = checkLike;
