const handleError = require("./utils/handleError");
const validateCommentObject = require("./validation/validateCommentObject");
const validatePostId = require("./validation/validatePostId");
const checkPostExists = require("./utils/checkPostExists");

async function createNewComment(req, res, next, database) {
    const userId = req.user._id;
    let comment = req.body;

    let err;
    [err, comment] = await validateComment(comment, database);
    if (err) return handleError(err, res, next);

    comment = {
        ...comment,
        userId,
        createdAt: Date.now(),
    };

    err = await addNewCommentToDatabase(comment, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function validateComment(commentObject, database) {
    let [err, comment] = await validateCommentObject(commentObject);
    if (err) return [err, null];

    err = validatePostId(comment.postId);
    if (err) return [err, null];

    err = await checkPostExists(comment.postId, database);
    if (err) return [err, null];

    return [null, comment];
}

async function addNewCommentToDatabase(comment, database) {
    try {
        await database.addNewComment(comment);
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = createNewComment;
