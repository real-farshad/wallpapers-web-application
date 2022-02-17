const Joi = require("joi");
const { ObjectId } = require("mongodb");

const idSchema = Joi.string().min(3).max(64).required();

async function validateId(id) {
    try {
        await idSchema.validateAsync(id);

        if (!ObjectId.isValid(id)) return false;
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = validateId;
