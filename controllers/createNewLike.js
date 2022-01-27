const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// POST /:id
async function createNewLike(req, res, next, database) {
    const postIdError = validatePostId(req.params.id);
    if (postIdError) return handleError(postIdError, res, next);

    const postError = await validatePost(req.params.id, database);
    if (postError) return handleError(postError, res, next);

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
        return next(err);
    }
}

async function validatePost(postId, database) {
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

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = createNewLike;
