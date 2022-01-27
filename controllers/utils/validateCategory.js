const { categorySchema } = require("../schemas/categoriesSchemas");

async function validateCategory(category) {
    try {
        const validCategory = await categorySchema.validateAsync(category);
        return [null, validCategory];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

module.exports = validateCategory;
