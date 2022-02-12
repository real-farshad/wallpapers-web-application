const Joi = require("joi");

const categoriesQuerySchema = Joi.object({
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0),
});

async function validateCategoriesQuery(query) {
    try {
        const validQuery = await categoriesQuerySchema.validateAsync(query);
        return [null, validQuery];
    } catch (err) {
        return [err, null];
    }
}

module.exports = validateCategoriesQuery;
