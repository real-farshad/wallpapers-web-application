const { collectionSchema } = require("../schemas/collectionsSchemas");

// POST /
// req.body => title
async function createNewCollection(req, res, next, database) {
    const [err, collection] = await validateCollection(req.body);
    if (err) return handleError(err);

    try {
        await database.addNewCollection({
            ...collection,
            userId: req.user._id,
            postCount: 0,
            createdAt: Date.now(),
        });

        return res.json({ newCollectionAdded: true });
    } catch (err) {
        next(err);
    }
}

async function validateCollection(collection) {
    let validCollection = { ...collection };

    try {
        validCollection = await collectionSchema.validateAsync(validCollection);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }

    return [null, validCollection];
}

module.exports = createNewCollection;
