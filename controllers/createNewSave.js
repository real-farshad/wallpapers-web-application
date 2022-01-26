const validateId = require("../utils/validateId");

// POST /:id
async function createNewSave(req, res, next, database) {
    const err = await validatePostId(req.params.id, database);
    if (err) return handleError(err, res, next);

    try {
        const postAlreadySaved = await database.findOnePostSave({
            postId: req.body.postId,
            userId: req.user.userId,
        });

        if (postAlreadySaved) {
            return res.status(403).json({
                error: "post has already been saved!",
            });
        }

        await database.addNewSave({
            postId: req.body.postId,
            userId: req.user.userId,
            createdAt: Date.now(),
        });

        return res.json({ postSaved: true });
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

module.exports = createNewSave;
