const handleError = require("./utils/handleError");
const validateCollectionId = require("./validation/validateCollectionId");
const checkCollectionPostExists = require("./utils/checkCollectionPostExists");
const checkUserCollectionAccess = require("./utils/checkUserCollectionAccess");

async function deleteCollectionPost(req, res, next, database) {
    const userId = req.user._id;
    const collectionPostId = req.params.id;

    let err = validateCollectionId(collectionPostId);
    if (err) return handleError(err, res, next);

    let collectionPost;
    [err, collectionPost] = await checkCollectionPostExists(
        collectionPostId,
        database
    );
    if (err) return handleError(err, res, next);

    err = await checkUserCollectionAccess(
        collectionPost.collectionId,
        userId,
        database
    );
    if (err) return handleError(err, res, next);

    err = await deleteCollectionPostFromDatabase(collectionPostId, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function deleteCollectionPostFromDatabase(collectionPostId, database) {
    try {
        await database.deleteCollectionPostById(collectionPostId);
        await database.decrementCollectionPostCount(collectionPostId);
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = deleteCollectionPost;
