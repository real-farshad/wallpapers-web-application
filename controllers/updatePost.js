const validatePostId = require("./utils/validatePostId");
const handleError = require("./utils/handleError");
const { postSchema } = require("../schemas/postsSchemas");

// PUT /:id
// body.request => imageUrl, title, category
async function updatePost(req, res, next, database) {
    const postIdError = validatePostId(req.params.id);
    if (postIdError) return handleError(postIdError, res, next);

    const [postError, post] = await validatePost(req.body);
    if (postError) return handleError(postError);

    const accessError = await checkUserPostAccess(
        {
            postId: req.params.id,
            userId: req.user._id,
        },
        database
    );

    if (accessError) return handleError(accessError);

    const [categoryError, category] = await validateCategoryTitle(
        post.category,
        database
    );

    if (categoryError) return handleError(categoryError);

    post.categoryId = category._id;
    delete post.category;

    try {
        await database.findAndUpdatePostById(postId, post);

        return res.json({ postUpdated: true });
    } catch (err) {
        return next(err);
    }
}

async function validatePost(post) {
    try {
        const validPost = await postSchema.validateAsync(post);
        return [null, validPost];
    } catch (err) {
        const knwonError = {
            knwon: true,
            status: 403,
            message: err.message,
        };

        return [knwonError, null];
    }
}

async function checkUserPostAccess({ postId, userId }, database) {
    try {
        const post = await database.findUserPostById({ postId, userId });
        if (!post) {
            const knownError = {
                known: true,
                status: 404,
                message: "no post with this id, for this user was found!",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
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

module.exports = updatePost;
