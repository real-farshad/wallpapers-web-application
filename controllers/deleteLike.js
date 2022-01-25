const validateId = require("../utils/validateId");
const handleError = require("../utils/handleError");

// DELETE /:id
async function deleteLike(req, res, next, database) {
    const err = await validatePostId(req.params.id, database);
    if (err) return handleError(err, res, next);

    try {
        const result = await database.findAndDeleteLike({
            postId: req.params.id,
            userId: req.user._id,
        });

        if (!result) {
            return res.status(404).json({
                error: "no like with this id, for this user, was found!",
            });
        }

        await database.decrementLikeCount(req.params.id);

        return res.json({ likeDeleted: true });
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

module.exports = deleteLike;
