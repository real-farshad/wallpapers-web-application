const Joi = require("joi");

const categoriesQuerySchema = Joi.object({
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0).max(20),
});

async function validateCategoriesQuery(query) {
    let error, validQuery;

    try {
        validQuery = await categoriesQuerySchema.validateAsync(query);
        error = null;
    } catch (err) {
        error = err;
        validQuery = null;
    }

    return [error, validQuery];
}

module.exports = validateCategoriesQuery;
