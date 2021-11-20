const Joi = require("joi");

const postLikeSchema = Joi.object({
    postId: Joi.string().max(64).required(),
});

const likedPostsQuery = Joi.object({
    page: Joi.number().min(0),
    limit: Joi.number().max(20),
});

module.exports = {
    postLikeSchema,
    likedPostsQuery,
};
