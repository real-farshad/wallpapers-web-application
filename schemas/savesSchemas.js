const Joi = require("joi");

const saveSchema = Joi.object({
    postId: Joi.string().max(64).required(),
});

const savesQuerySchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(10),
});

module.exports = {
    saveSchema,
    savesQuerySchema,
};
