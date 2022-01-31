const handleError = require("./utils/handleError");
const validateCollectionPostObject = require("./validation/validateCollectionPostObject");
const validatePostId = require("./validation/validatePostId");
const validateCollectionId = require("./validation/validateCollectionId");
const checkPostExists = require("./utils/checkPostExists");
const checkCollectionExists = require("./utils/checkCollectionExists");

async function createNewCollectionPost(req, res, next, database) {
    const userId = req.user._id;
    let collectionPost = req.body;

    let err;
    [err, collectionPost] = await validateCollectionPost(
        collectionPost,
        userId,
        database
    );

    if (err) return handleError(err, res, next);

    collectionPost = {
        ...collectionPost,
        createdAt: Date.now(),
    };

    err = await addNewCollectionPostToDatabase(collectionPost, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function validateCollectionPost(collectionPostObject, userId, database) {
    let [err, collectionPost] = await validateCollectionPostObject(
        collectionPostObject
    );
    if (err) return [err, null];

    err = validatePostId(collectionPost.postId);
    if (err) return [err, null];

    err = validateCollectionId(collectionPost.collectionId);
    if (err) return [err, null];

    err = await checkPostExists(collectionPost.postId, database);
    if (err) return [err, null];

    err = await checkCollectionExists(
        { collectionId: collectionPost.collectionId, userId },
        database
    );
    if (err) return [err, null];

    return [null, collectionPost];
}

async function addNewCollectionPostToDatabase(collectionPost, database) {
    try {
        await database.addNewCollectionPost(collectionPost);

        await database.incrementCollectionPostCount(
            collectionPost.collectionId
        );

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = createNewCollectionPost;
