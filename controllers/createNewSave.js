const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// POST /:id
async function createNewSave(req, res, next, database) {
    const postIdError = await validatePostId(req.params.id, database);
    if (postIdError) return handleError(postIdError, res, next);

    const postError = await validatePost(req.params.id, database);
    if (postError) return handleError(postError);

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

module.exports = createNewSave;
