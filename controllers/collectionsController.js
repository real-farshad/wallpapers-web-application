const validateId = require("../utils/validateId");
const {
    collectionSchema,
    collectionsQuerySchema,
} = require("../schemas/collectionsSchemas");

// GET /
// req.query => page, limit
async function getNewCollections(req, res, next, database) {
    let query = {
        search: req.query.search || "",
        page: req.query.page || 1,
        limit: req.query.limit || 3,
    };

    // validate query
    try {
        query = await collectionsQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { search, page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // find and return latest collections
        const collections = await database.findCollections(search, skip, limit);
        return res.json(collections);
    } catch (err) {
        next(err);
    }
}

// GET /:id
// req.query => collectionId
async function getCollectionInfo(req, res, next, database) {
    const collectionId = req.params.id;

    // validate collection id
    const isValidId = validateId(collectionId);
    if (!isValidId) return res.status(403).json({ error: "invalid collection id!" });

    try {
        // find collection by id and return it
        const collection = await database.findCollectionById(collectionId);
        return res.json(collection);
    } catch (err) {
        next(err);
    }
}

// GET /
// req.query => page, limit
async function getUserCollections(req, res, next, database) {
    const userId = req.user._id;
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 3,
    };

    // validate query
    try {
        query = await collectionsQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // find and return collections
        const collections = await database.findUserCollections(userId, skip, limit);
        return res.json(collections);
    } catch (err) {
        next(err);
    }
}

// POST /
// req.body => title
async function createNewCollection(req, res, next, database) {
    let newCollection = req.body;

    // validate request body
    try {
        newCollection = await collectionSchema.validateAsync(newCollection);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // set extra fields for new collection
    newCollection.userId = req.user._id;
    newCollection.createdAt = Date.now();
    newCollection.postCount = 0;

    try {
        // add new collection to database
        await database.addNewCollection(newCollection);

        // return success
        return res.json({ newCollectionAdded: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deleteCollection(req, res, next, database) {
    const collectionId = req.params.id;
    const userId = req.user._id;

    // validate collection id
    const isValidId = validateId(collectionId);
    if (!isValidId) return res.status(403).json({ error: "invalid collection id!" });

    // delete related collection posts

    try {
        // delete collection
        const result = await database.findAndDeleteCollection(collectionId, userId);

        if (!result) {
            return res.status(404).json({
                error: "no collection with this id, for this user, was found!",
            });
        }

        // return success
        return res.json({ collectionDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getNewCollections,
    getCollectionInfo,
    getUserCollections,
    createNewCollection,
    deleteCollection,
};
