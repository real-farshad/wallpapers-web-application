const validateId = require("../utils/validateId");
const { postSaveSchema, savedPostsQuerySchema } = require("../schemas/postsSavesSchemas");

// GET /
async function getSavedPostsList(req, res, next, database) {
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };

    const userId = req.user._id;

    // validate query
    try {
        query = await savedPostsQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * 10;

    try {
        // find and return user liked posts
        const userLikedPosts = await database.getUserSavedPosts(userId, skip, limit);
        return res.json(userLikedPosts);
    } catch (err) {
        next(err);
    }
}

// GET /:id
async function getPostSave(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find post save with these post and user ids
        const result = await database.findOnePostSave(postId, userId);

        if (!result) {
            return res.json({
                isSaved: false,
            });
        }

        // return result to see if the post has been saved
        return res.json({ isSaved: true });
    } catch (err) {
        next(err);
    }
}

// POST /
// req.body => postId
async function createNewPostSave(req, res, next, database) {
    let newPostSave = req.body;

    // validate request body
    try {
        newPostSave = await postSaveSchema.validateAsync(newPostSave);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post id
    const isValidId = validateId(newPostSave.postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // add user id to post save
    newPostSave.userId = req.user._id;

    try {
        // check if post has already been liked
        const previousPostSave = await database.findOnePostSave(
            newPostSave.postId,
            newPostSave.userId
        );

        if (previousPostSave) {
            return res.status(403).json({
                error: "post has already been saved!",
            });
        }

        // add like to post likes collection
        await database.addNewPostSave(newPostSave);

        // return success
        return res.json({ postSaved: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deletePostSave(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find and delete post save from post saves collection
        const result = await database.findAndDeletePostSave(postId, userId);

        if (!result) {
            return res.status(404).json({
                error: "no post save with this id, for this user, was found!",
            });
        }

        // return success
        return res.json({ postSaveDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSavedPostsList,
    getPostSave,
    createNewPostSave,
    deletePostSave,
};
