const Joi = require("joi");

const savesQuerySchema = Joi.object({
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0),
});

async function validateSavesQuery(query) {
    let error;
    let validQuery;

    try {
        validQuery = await savesQuerySchema.validateAsync(query);
        error = null;
    } catch (err) {
        error = err;
        validQuery = null;
    }

    return [error, validQuery];
}

module.exports = validateSavesQuery;
