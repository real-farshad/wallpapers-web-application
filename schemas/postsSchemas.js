const Joi = require("joi");

const postSchema = Joi.object({
    imageUrl: Joi.object({
        thumbnail: Joi.string().min(3).max(256).required(),
        large: Joi.string().min(3).max(256).required(),
    }),
    title: Joi.string().trim().min(3).max(64).required(),
    category: Joi.string().lowercase().trim().min(3).max(64).required(),
});

const postQuerySchema = Joi.object({
    search: Joi.string().trim().max(64).allow(""),
    category: Joi.string().lowercase().trim().max(64).allow(""),
    duration: Joi.string().valid("2021", "2020").allow(""),
    sort: Joi.string().valid("new", "popular"),
    page: Joi.number().min(0),
    limit: Joi.number().max(20),
});

module.exports = {
    postSchema,
    postQuerySchema,
};
