const Joi = require("joi");

const countWallpapersQuerySchema = Joi.object({
    title: Joi.string().trim().min(3).max(64),
    category: Joi.string().lowercase().trim().min(3).max(32),
    duration: Joi.number().valid(2021, 2020),
});

async function validateCountWallpapersQuery(query) {
    let error, validQuery;

    try {
        validQuery = await countWallpapersQuerySchema.validateAsync(query);
        error = null;
    } catch (err) {
        error = err;
        validQuery = null;
    }

    return [error, validQuery];
}

module.exports = validateCountWallpapersQuery;
