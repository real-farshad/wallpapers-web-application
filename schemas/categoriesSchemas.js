const Joi = require("joi");

const categorySchema = Joi.object({
    title: Joi.string().min(3).max(32).required(),
});

module.exports = { categorySchema };
