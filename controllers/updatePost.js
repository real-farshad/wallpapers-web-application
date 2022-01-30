const validatePostId = require("./utils/validatePostId");
const validatePostObject = require("./utils/validatePostObject");
const checkUserPostAccess = require("./utils/checkUserPostAccess");
const findCategoryByTitleInDatabase = require("./utils/findCategoryByTitleInDatabase");
const handleError = require("./utils/handleError");

async function updatePost(req, res, next, database) {
    const userId = req.user.id;
    const postId = req.params.id;
    let post = req.body;

    let err = validatePostId(postId);
    if (err) return handleError(err, res, next);

    [err, post] = await validatePostObject(post);
    if (err) return handleError(err, res, next);

    err = await checkUserPostAccess(postId, userId, database);
    if (err) return handleError(err, res, next);

    let category;
    [err, category] = await findCategoryByTitleInDatabase(
        post.category,
        database
    );
    if (err) return handleError(err, res, next);

    post.categoryId = category._id;
    delete post.category;

    err = await updatePostInDatabase(postId, post, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function updatePostInDatabase(postId, post, database) {
    try {
        await database.findAndUpdatePostById(postId, post);
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = updatePost;
