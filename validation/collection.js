const Joi = require("joi");

const collectionSchema = Joi.object({
    title: Joi.string().lowercase().trim().min(3).max(64).required(),
});

async function validateCollection(collection) {
    let error, validCollection;

    try {
        validCollection = await collectionSchema.validateAsync(collection);
        error = null;
    } catch (err) {
        error = err;
        validCollection = null;
    }

    return [error, validCollection];
}

module.exports = validateCollection;
