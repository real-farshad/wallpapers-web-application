const validateId = require("../utils/validateId");

// GET /:id
async function getCollectionInfo(req, res, next, database) {
    const isValidId = validateId(req.params.id);
    if (!isValidId)
        return res.status(403).json({ error: "invalid collection id!" });

    try {
        const collection = await database.findCollectionById(req.params.id);
        return res.json(collection);
    } catch (err) {
        next(err);
    }
}

module.exports = getCollectionInfo;
