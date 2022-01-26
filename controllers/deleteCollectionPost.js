const validateId = require("../utils/validateId");
const handleError = require("../utils/handleError");

// DELETE /:id
async function deleteCollectionPost(req, res, next, database) {
    const isValidId = validateId(collectionPostId);
    if (!isValidId) {
        return res.status(403).json({
            error: "invalid collection post id!",
        });
    }

    let [err, collectionPost] = await validateCollectionPost(
        req.params.id,
        database
    );

    if (err) return handleError(err);

    err = await checkUserCollectionAccess(
        {
            collectionId: collectionPost.collectionId,
            userId: req.user._id,
        },
        database
    );

    if (err) return handleError(err);

    try {
        await database.deleteCollectionPostById(collectionPostId);

        await database.decrementCollectionPostCount(
            collectionPost.collectionId
        );

        return res.json({ collectionPostDeleted: true });
    } catch (err) {
        next(err);
    }
}

async function validateCollectionPost(collectionPostId, database) {
    try {
        const collectionPost = await database.findCollectionPostById(
            collectionPostId
        );

        if (!collectionPost) {
            const knownError = {
                known: true,
                status: 404,
                message: "no collection post with this id was found!",
            };

            return [knownError, null];
        }

        return [null, collectionPost];
    } catch (err) {
        return [err, null];
    }
}

async function checkUserCollectionAccess({ collectionId, userId }, database) {
    try {
        const collection = await database.findUserCollectionById({
            collectionId,
            userId,
        });

        if (!collection) {
            const knownError = {
                known: true,
                status: 404,
                message:
                    "no collection with this id, for this user, was found!",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = deleteCollectionPost;
