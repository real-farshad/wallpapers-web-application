const Joi = require("joi");
const { ObjectId } = require("mongodb");

const commentSchema = Joi.object({
    description: Joi.string().trim().min(3).max(256).required(),
    wallpaperId: Joi.string().min(3).max(64).required(),
});

async function validateComment(comment) {
    let error;
    let validComment;

    try {
        validComment = await commentSchema.validateAsync(comment);

        if (!ObjectId.isValid(validComment.wallpaperId)) {
            error = { message: "invalid wallpaperId!" };
            validComment = null;
        } else {
            error = null;
        }
    } catch (err) {
        error = err;
    }

    return [error, validComment];
}

module.exports = validateComment;
