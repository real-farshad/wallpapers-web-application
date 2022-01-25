const validateId = require("../utils/validateId");
const handleError = require("../utils/handleError");

// POST /:id
async function createNewLike(req, res, next, database) {
    const err = await validatePostId(req.params.id, database);
    if (err) return handleError(err, res, next);

    try {
        const postAlreadyLiked = await database.findOnePostLike({
            postId: req.params.id,
            userId: req.user._id,
        });

        if (postAlreadyLiked) {
            return res.status(403).json({
                error: "post has already been liked!",
            });
        }

        await database.addNewLike({
            postId: req.params.postId,
            createdAt: Date.now(),
            userId: req.user._id,
        });

        await database.incrementLikeCount(newLike.postId);

        return res.json({ postLiked: true });
    } catch (err) {
        next(err);
    }
}

async function validatePostId(postId, database) {
    const isValidId = validateId(postId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 403,
            message: "invalid post id!",
        };

        return knownError;
    }

    try {
        const post = await database.findPostById(postId);
        if (!post) {
            const knownError = {
                known: true,
                status: 404,
                message: "no post with this id was found!",
            };

            return knownError;
        }
    } catch (err) {
        return err;
    }

    return null;
}

module.exports = createNewLike;
