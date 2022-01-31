const handleError = require("./utils/handleError");
const validateCollectionObject = require("./validation/validateCollectionObject");

async function createNewCollection(req, res, next, database) {
    const userId = req.user._id;
    let collection = req.body;

    let err;
    [err, collection] = await validateCollectionObject(collection);
    if (err) return handleError(err, res, next);

    collection = {
        ...collection,
        userId,
        postCount: 0,
        createdAt: Date.now(),
    };

    err = await addNewCollectionToDatabase(collection, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function addNewCollectionToDatabase(collection, database) {
    try {
        await database.addNewCollection(collection);
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = createNewCollection;
