const Joi = require("joi");

const categorySchema = Joi.object({
    title: Joi.string().lowercase().trim().min(3).max(32).required(),
});

async function validateCategory(category) {
    let error, validCategory;

    try {
        validCategory = await categorySchema.validateAsync(category);
        error = null;
    } catch (err) {
        error = err;
        validCategory = null;
    }

    return [error, validCategory];
}

module.exports = validateCategory;
