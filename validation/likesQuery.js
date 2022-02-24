const Joi = require("joi");

const likesQuerySchema = Joi.object({
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0).max(20),
});

async function validateLikesQuery(query) {
    let error, validQuery;

    try {
        validQuery = await likesQuerySchema.validateAsync(query);
        error = null;
    } catch (err) {
        error = err;
        validQuery = null;
    }

    return [error, validQuery];
}

module.exports = validateLikesQuery;
