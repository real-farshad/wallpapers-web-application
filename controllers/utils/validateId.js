const { ObjectId } = require("mongodb");

function validateId(id) {
    if (!ObjectId.isValid(id)) return false;
    return true;
}

module.exports = validateId;
