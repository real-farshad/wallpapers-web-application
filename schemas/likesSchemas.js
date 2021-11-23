const Joi = require("joi");

const likeSchema = Joi.object({
    postId: Joi.string().max(64).required(),
});

const likesQuerySchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(20),
});

module.exports = {
    likeSchema,
    likesQuerySchema,
};
