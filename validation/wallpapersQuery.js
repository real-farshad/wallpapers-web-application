const Joi = require("joi");

const wallpapersQuerySchema = Joi.object({
    title: Joi.string().trim().min(3).max(64),
    category: Joi.string().lowercase().trim().min(3).max(32),
    duration: Joi.number().valid(2021, 2020),
    sort: Joi.string().valid("new", "popular"),
    page: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(0).max(20),
});

async function validateWallpapersQuery(query) {
    let error, validQuery;

    try {
        validQuery = await wallpapersQuerySchema.validateAsync(query);
        error = null;
    } catch (err) {
        error = err;
        validQuery = null;
    }

    return [error, validQuery];
}

module.exports = validateWallpapersQuery;
