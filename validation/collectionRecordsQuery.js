const Joi = require("joi");

const collectionWallpapersQuerySchema = Joi.object({
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0),
});

async function validateCollectionRecordsQuery(query) {
    let error;
    let validQuery;

    try {
        validQuery = await collectionWallpapersQuerySchema.validateAsync(query);
        error = null;
    } catch (err) {
        error = err;
        validQuery = null;
    }

    return [error, validQuery];
}

module.exports = validateCollectionRecordsQuery;
