const Joi = require("joi");

const postCommentSchema = Joi.object({
    description: Joi.string().trim().min(3).max(256).required(),
    postId: Joi.string().max(64).required(),
});

const postCommentsQuerySchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(10),
});

module.exports = {
    postCommentSchema,
    postCommentsQuerySchema,
};
