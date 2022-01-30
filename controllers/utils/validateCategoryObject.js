const { categorySchema } = require("../schemas/categoriesSchemas");

async function validateCategoryObject(categoryObject) {
    try {
        const category = await categorySchema.validateAsync(categoryObject);
        return [null, category];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

module.exports = validateCategoryObject;
