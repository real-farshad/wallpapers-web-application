const validatePostObject = require("./utils/validatePostObject");
const findCategoryByTitleInDatabase = require("./utils/findCategoryByTitleInDatabase");
const handleError = require("./utils/handleError");

async function createNewPost(req, res, next, database) {
    const userId = req.user._id;
    let post = req.body;

    let err;
    [err, post] = await validatePost(req.body, database);
    if (err) return handleError(err, res, next);

    post = {
        ...post,
        likeCount: 0,
        createdAt: Date.now(),
        publisherId: userId,
    };

    err = await addNewPostToDatabase(post, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function validatePost(postObject, database) {
    let [err, post] = await validatePostObject(postObject);
    if (err) return [err, null];

    let category;
    [err, category] = await findCategoryByTitleInDatabase(
        post.category,
        database
    );
    if (err) return [err, null];

    post.categoryId = category._id;
    delete post.category;

    return [null, post];
}

async function addNewPostToDatabase(post, database) {
    try {
        await database.addNewPost(post);
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = createNewPost;
