const Joi = require("joi");

const postSaveSchema = Joi.object({
    postId: Joi.string().max(64).required(),
});

const savedPostsQuerySchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(10),
});

module.exports = {
    postSaveSchema,
    savedPostsQuerySchema,
};
