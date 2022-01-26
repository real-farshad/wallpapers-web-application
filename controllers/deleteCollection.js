const validateId = require("../utils/validateId");

// DELETE /:id
async function deleteCollection(req, res, next, database) {
    const isValidCollectionId = validateId(req.params.id);
    if (!isValidCollectionId) {
        return res.status(403).json({
            error: "invalid collection id!",
        });
    }

    try {
        const result = await database.findAndDeleteCollection(
            req.params.id,
            req.user._id
        );

        if (!result) {
            return res.status(404).json({
                error: "no collection with this id, for this user, was found!",
            });
        }

        await database.deleteManycollectionPosts(req.params.id);

        return res.json({ collectionDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = deleteCollection;
