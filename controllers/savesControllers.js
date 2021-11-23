const validateId = require("../utils/validateId");
const { saveSchema, savesQuerySchema } = require("../schemas/savesSchemas");

// GET /
async function getUserSavedPosts(req, res, next, database) {
    const userId = req.user._id;
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };

    // validate query
    try {
        query = await savesQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // find and return user saved posts
        const userSavedPosts = await database.getUserSavedPosts(userId, skip, limit);
        return res.json(userSavedPosts);
    } catch (err) {
        next(err);
    }
}

// GET /:id
async function checkSave(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find save with these post and user ids
        const result = await database.findOneSave(postId, userId);

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
async function createNewSave(req, res, next, database) {
    let newSave = req.body;

    // validate request body
    try {
        newSave = await saveSchema.validateAsync(newSave);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post id
    const isValidId = validateId(newSave.postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // set extra fields for new save
    newSave.userId = req.user._id;
    newSave.createdAt = Date.now();

    try {
        // make sure there is a post with this id in the database
        const post = await database.findPostById(newSave.postId);

        if (!post) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        // check if post has already been saved
        const previousPostSave = await database.findOnePostSave(
            newSave.postId,
            newSave.userId
        );

        if (previousPostSave) {
            return res.status(403).json({
                error: "post has already been saved!",
            });
        }

        // add new save to saves collection
        await database.addNewSave(newSave);

        // return success
        return res.json({ postSaved: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deleteSave(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate post id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find and delete save from saves collection
        const result = await database.findAndDeleteSave(postId, userId);

        if (!result) {
            return res.status(404).json({
                error: "no save with this id, for this user, was found!",
            });
        }

        // return success
        return res.json({ saveDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserSavedPosts,
    checkSave,
    createNewSave,
    deleteSave,
};
