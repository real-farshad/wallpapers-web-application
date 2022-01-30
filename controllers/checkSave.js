const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// GET /:id
async function checkSave(req, res, next, database) {
    const userId = req.user._id;
    const postId = req.params.id;

    let err = validatePostId(postId);
    if (err) return handleError(err, res, next);

    let save;
    [err, save] = await findUserSaveInDatabase(userId, postId, database);
    if (err) return handleError(err, res, next);

    if (!save) return res.json({ saved: false });
    return res.json({ saved: true });
}

async function findUserSaveInDatabase(postId, userId, database) {
    try {
        const save = await database.findOneSave({ userId, postId });
        return [null, save];
    } catch (err) {
        return [err, null];
    }
}

module.exports = checkSave;
