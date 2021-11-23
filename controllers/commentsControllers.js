const validateId = require("../utils/validateId");
const { commentSchema, commentsQuerySchema } = require("../schemas/commentsSchemas");

// GET /
async function getUserComments(req, res, next, database) {
    const userId = req.user._id;
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };

    // validate query
    try {
        query = await commentsQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // find and return user comments
        const userComments = await database.getUserCommentsList(userId, skip, limit);
        return res.json(userComments);
    } catch (err) {
        next(err);
    }
}

// GET /:id
async function getPostComments(req, res, next, database) {
    const postId = req.params.id;
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };

    // validate post's id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // validate query
    try {
        query = await commentsQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * 10;

    try {
        // find related comments
        const comments = await database.getCommentsList(postId, skip, limit);

        let formattedComments = comments.map((comment) => {
            if (comment.user[0].googleId) {
                return {
                    ...comment,
                    user: {
                        username: comment.user[0]._json.name,
                        avatar: comment.user[0]._json.picture,
                    },
                };
            }

            return {
                ...comment,
                user: { username: comment.user[0].username },
            };
        });

        return res.json(formattedComments);
    } catch (err) {
        next(err);
    }
}

// POST /
// req.body => description, postId
async function createNewComment(req, res, next, database) {
    let newComment = req.body;

    // validate request's body
    try {
        newComment = await commentSchema.validateAsync(newComment);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post's id
    const isValidId = validateId(newComment.postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // set extra fields for new comment
    newComment.userId = req.user._id;
    newComment.createdAt = Date.now();

    try {
        // make sure there is a post with this id in the database
        const post = await database.findPostById(newComment.postId);

        if (!post) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        // add new comment to database
        await database.addNewComment(newComment);

        // increment post commentCount by 1
        await database.incrementCommentCount();

        // return success
        return res.json({ newCommentAdded: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deleteComment(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate comment id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find and delete comment
        const result = await database.findAndDeleteComment(postId, userId);

        if (!result) {
            return res.status(404).json({
                error: "no comment with this id, for this user, was found!",
            });
        }

        // decrement post commentCount
        await database.decrementCommentCount(postId);

        // return success
        return res.json({ commentDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserComments,
    getPostComments,
    createNewComment,
    deleteComment,
};
