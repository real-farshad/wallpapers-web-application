const Joi = require("joi");

const postSchema = Joi.object({
    image_url: Joi.object({
        thumbnail: Joi.string().min(3).max(256).required(),
        large: Joi.ref("thumbnail"),
    }),
    title: Joi.string().min(3).max(64).required(),
    category: Joi.string().min().max().required(),
    views: Joi.number().min(0).required(),
    likes_count: Joi.number().min(0).required(),
    comments_count: Joi.number().min(0).required(),
    downloads_count: Joi.number().min(0).required(),
    publish_date: Joi.date().required(),
    publisher: Joi.string().min().max().required(),
});

const postQuerySchema = Joi.object({
    search: Joi.string().max(64).allow(""),
    category: Joi.string().max(64).allow(""),
    sort: Joi.string().valid("new", "popular"),
    page: Joi.number().min(0),
    limit: Joi.number().max(20),
});

module.exports = {
    postSchema,
    postQuerySchema,
};
