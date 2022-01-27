const { commentSchema } = require("../schemas/commentsSchemas");
const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");

// POST /
// req.body => description, postId
async function createNewComment(req, res, next, database) {
    let [err, comment] = await validateComment(req.body);
    if (err) return handleError(err, res, next);

    err = await validatePostId(comment.postId, database);
    if (err) return handleError(err, res, next);

    try {
        await database.addNewComment({
            ...comment,
            userId: req.user._id,
            createdAt: Date.now(),
        });

        return res.json({ newCommentAdded: true });
    } catch (err) {
        return next(err);
    }
}

async function validateComment(comment) {
    let validComment = { ...comment };

    try {
        validComment = await commentSchema.validateAsync(validComment);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };
        return [knownError, null];
    }

    return [null, validComment];
}

async function validatePostId(postId, database) {
    const postIdError = validatePostId(postId);
    if (postIdError) return postIdError;

    try {
        const post = await database.findPostById(postId);
        if (!post) {
            const knownError = {
                known: true,
                status: 404,
                message: "no post with this id was found!",
            };

            return knownError;
        }
    } catch (err) {
        return err;
    }

    return null;
}

module.exports = createNewComment;
