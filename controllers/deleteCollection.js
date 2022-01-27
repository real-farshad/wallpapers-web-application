const validateCollectionId = require("./utils/validateCollectionId");
const handleError = require("./utils/handleError");

// DELETE /:id
async function deleteCollection(req, res, next, database) {
    const err = validateCollectionId(req.params.id);
    if (err) return handleError(err, res, next);

    try {
        const success = await database.findAndDeleteCollection(
            req.params.id,
            req.user._id
        );

        if (!success) {
            return res.status(404).json({
                error: "no collection with this id, for this user, was found!",
            });
        }

        await database.deleteManycollectionPosts(req.params.id);

        return res.json({ collectionDeleted: true });
    } catch (err) {
        return next(err);
    }
}

module.exports = deleteCollection;
