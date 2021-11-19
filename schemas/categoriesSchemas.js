const Joi = require("joi");

const categorySchema = Joi.object({
    title: Joi.string().lowercase().trim().min(3).max(32).required(),
});

module.exports = { categorySchema };
