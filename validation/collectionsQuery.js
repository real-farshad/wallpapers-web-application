const Joi = require("joi");

const collectionsQuerySchema = Joi.object({
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0),
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
