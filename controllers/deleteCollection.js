const handleError = require("./utils/handleError");
const validateCollectionId = require("./validation/validateCollectionId");

async function deleteCollection(req, res, next, database) {
    const userId = req.user._id;
    const collectionId = req.params.id;

    let err = validateCollectionId(collectionId);
    if (err) return handleError(err, res, next);

    err = await deleteCollectionFromDatabase(collectionId, userId, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function deleteCollectionFromDatabase(collectionId, userId, database) {
    try {
        const success = await database.findAndDeleteCollection(
            collectionId,
            userId
        );

        if (!success) {
            const knownError = {
                known: true,
                status: 404,
                message:
                    "no collection with this id, for this user, was found!",
            };

            return knownError;
        }

        await database.deleteManycollectionPosts(collectionId);

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = deleteCollection;
