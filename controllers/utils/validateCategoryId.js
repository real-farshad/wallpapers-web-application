const validateId = require("./validateId");

function validateCategoryId(categoryId) {
    const isValidCategoryId = validateId(categoryId);
    if (!isValidCategoryId) {
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
