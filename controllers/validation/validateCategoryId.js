const validateId = require("../utils/validateId");

function validateCategoryId(categoryId) {
    const isValidId = validateId(categoryId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 403,
            message: "invalid category id!",
        };

        return knownError;
    } else {
        return null;
    }
}

module.exports = validateCategoryId;
