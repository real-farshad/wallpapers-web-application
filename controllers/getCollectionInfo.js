const validateCollectionId = require("./utils/validateCollectionId");
const handleError = require("./utils/handleError");

// GET /:id
async function getCollectionInfo(req, res, next, database) {
    const err = validateCollectionId(req.params.id);
    if (err) return handleError(err, res, next);

    try {
        const collection = await database.findCollectionById(req.params.id);
        return res.json(collection);
    } catch (err) {
        return next(err);
    }
}

module.exports = getCollectionInfo;
