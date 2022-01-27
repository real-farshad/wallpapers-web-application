const { postSchema } = require("../schemas/postsSchemas");
const handleError = require("./utils/handleError");

// POST /
// body.request => imageUrl, title, category
async function createNewPost(req, res, next, database) {
    const [postError, post] = await validatePost(req.body);
    if (postError) return handleError(postError, res, next);

    const [categoryError, category] = await validateCategoryTitle(
        post.category,
        database
    );

    if (categoryError) return handleError(categoryError);

    post.categoryId = category._id;
    delete post.category;

    try {
        await database.addNewPost({
            ...post,
            likeCount: 0,
            createdAt: Date.now(),
            publisherId: req.user._id,
        });

        return res.json({ newPostCreated: true });
    } catch (err) {
        return next(err);
    }
}

async function validatePost(post) {
    let validPost = { ...post };

    try {
        validPost = await postSchema.validateAsync(validPost);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };
        return [knownError, null];
    }

    return [null, validPost];
}

async function validateCategoryTitle(categoryTitle, database) {
    try {
        const category = await database.findCategoryByTitle(categoryTitle);

        if (!category) {
            const knownError = {
                knwon: true,
                status: 404,
                message: "this category does not exist!",
            };

            return [knownError, null];
        }

        return [null, category];
    } catch (err) {
        return [err, null];
    }
}

module.exports = createNewPost;
