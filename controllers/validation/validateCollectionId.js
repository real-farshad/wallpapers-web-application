const validateId = require("../utils/validateId");

function validateCollectionId(collectionId) {
    const isValidId = validateId(collectionId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 403,
            message: "invalid collection id!",
        };

        return knownError;
    } else {
        return null;
    }
}

module.exports = validateCollectionId;
