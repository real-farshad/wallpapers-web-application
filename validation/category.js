const Joi = require("joi");

const categorySchema = Joi.object({
    title: Joi.string().lowercase().trim().min(3).max(32).required(),
});

async function validateCategory(category) {
    try {
        const validCategory = await categorySchema.validateAsync(category);
        return [null, validCategory];
    } catch (err) {
        return [err, null];
    }
}

module.exports = validateCategory;
