const Joi = require("joi");

const collectionSchema = Joi.object({
    title: Joi.string().trim().min(3).max(64).required(),
});

const collectionsQuerySchema = {
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(3),
};

module.exports = {
    collectionSchema,
    collectionsQuerySchema,
};
