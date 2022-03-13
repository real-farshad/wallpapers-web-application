const Joi = require("joi");

const countCollectionsQuerySchema = Joi.object({
    title: Joi.string().trim().min(3).max(64),
});

async function validateCountCollectionsQuery(query) {
    let error, validQuery;

    try {
        validQuery = await countCollectionsQuerySchema.validateAsync(query);
        error = null;
    } catch (err) {
        error = err;
        validQuery = null;
    }

    return [error, validQuery];
}

module.exports = validateCountCollectionsQuery;
