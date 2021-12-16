const Joi = require("joi");

const collectionSchema = Joi.object({
    title: Joi.string().trim().min(3).max(64).required(),
});

const collectionsQuerySchema = Joi.object({
    search: Joi.string().trim().max(64).allow(""),
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(10),
});

module.exports = {
    collectionSchema,
    collectionsQuerySchema,
};
