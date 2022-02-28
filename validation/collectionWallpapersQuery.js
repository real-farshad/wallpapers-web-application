const Joi = require("joi");

const collectionWallpapersQuerySchema = Joi.object({
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0).max(20),
});

async function validateCollectionWallpapersQuery(query) {
    let error, validQuery;

    try {
        validQuery = await collectionWallpapersQuerySchema.validateAsync(query);
        error = null;
    } catch (err) {
        error = err;
        validQuery = null;
    }

    return [error, validQuery];
}

module.exports = validateCollectionWallpapersQuery;
