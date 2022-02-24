const Joi = require("joi");

const collectionsQuerySchema = Joi.object({
    title: Joi.string().trim().min(3).max(64),
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0).max(20),
});

async function validateCollectionsQuery(query) {
    let error, validQuery;

    try {
        validQuery = await collectionsQuerySchema.validateAsync(query);
        error = null;
    } catch (err) {
        error = err;
        validQuery = null;
    }

    return [error, validQuery];
}

module.exports = validateCollectionsQuery;
