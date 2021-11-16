const Joi = require("joi");

const postLikeSchema = Joi.object({
    post_id: Joi.string().max(64).required(),
});

module.exports = { postLikeSchema };
