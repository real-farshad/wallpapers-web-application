const Joi = require("joi");
const validateId = require("../utils/validateId");

const likeSchema = Joi.object({
    postId: Joi.string().min(3).max(64).required(),
});

async function validateLike(like) {
    let error;
    let validLike;

    try {
        validLike = await likeSchema.validateAsync(like);

        if (!validateId(validLike.postId)) {
            validLike = null;
            error = { message: "postId is not a valid id!" };
        } else {
            error = null;
        }
    } catch (err) {
        validLike = null;
        error = err;
    }

    return [error, validLike];
}

module.exports = validateLike;
