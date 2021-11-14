const { ObjectId } = require("mongodb");

function validateMongoId(id) {
    if (!ObjectId.isValid(id)) return res.json({ error: "invalid id!" });
}

module.exports = validateMongoId;
