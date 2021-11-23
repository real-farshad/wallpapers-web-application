const Joi = require("joi");

const collectionPostSchema = Joi.object({
    collectionId: Joi.string().max(64).required(),
    postId: Joi.string().max(64).required(),
});

const collectionsPostsSchemas = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(10),
});

module.exports = {
    collectionPostSchema,
    collectionsPostsSchemas,
};
