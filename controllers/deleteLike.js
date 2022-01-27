const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// DELETE /:id
async function deleteLike(req, res, next, database) {
    const postIdError = validatePostId(req.params.id);
    if (postIdError) return handleError(postIdError, res, next);

    const postError = await validatePost(req.params.id, database);
    if (postError) return handleError(postError, res, next);

    try {
        const success = await database.findAndDeleteLike({
            postId: req.params.id,
            userId: req.user._id,
        });

        if (!success) {
            return res.status(404).json({
                error: "no like with this id, for this user, was found!",
            });
        }

        await database.decrementLikeCount(req.params.id);

        return res.json({ likeDeleted: true });
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

module.exports = deleteLike;
