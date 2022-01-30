const validatePostId = require("./utils/validatePostId");
const checkPostExists = require("./utils/checkPostExists");
const checkPostAlreadySaved = require("./utils/checkPostAlreadySaved");
const handleError = require("./utils/handleError");

async function createNewSave(req, res, next, database) {
    const userId = req.user._id;
    const postId = req.params.id;

    let err = validatePostId(postId, database);
    if (err) return handleError(err, res, next);

    err = await checkPostExists(postId, database);
    if (err) return handleError(err, res, next);

    err = await checkPostAlreadySaved(postId, userId, database);
    if (err) return handleError(err, res, next);

    const save = {
        postId,
        userId,
        createdAt: Date.now(),
    };

    err = await addSaveToDatabase(save, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function addSaveToDatabase(save, database) {
    try {
        await database.addNewSave(save);
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = createNewSave;
