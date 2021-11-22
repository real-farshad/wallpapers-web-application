const Joi = require("joi");

const createPostCollectionSchema = Joi.object({
    title: Joi.string().trim().min(3).max(64).required(),
});

const addToPostCollectionSchema = Joi.object({
    items: Joi.array([
        Joi.object({
            postId: Joi.string().max(64).required(),
        }),
    ])
        .min(1)
        .required(),
});

const postCollectionQuerySchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(20),
});

module.exports = {
    createPostCollectionSchema,
    addToPostCollectionSchema,
    postCollectionQuerySchema,
};
