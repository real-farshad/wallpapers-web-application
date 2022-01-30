const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

async function deleteSave(req, res, next, database) {
    const userId = req.user._id;
    const postId = req.params._id;

    let err = validatePostId(postId);
    if (err) return handleError(err, res, next);

    err = await deleteSaveFromDatabase(postId, userId, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function deleteSaveFromDatabase(postId, userId, database) {
    try {
        const success = await database.findAndDeleteSave({
            postId,
            userId,
        });

        if (!success) {
            const knownError = {
                known: true,
                status: 404,
                message: "no save with this id, for this user, was found!",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = deleteSave;
