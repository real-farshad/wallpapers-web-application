const validateId = require("../utils/validateId");
const {
    postCommentSchema,
    postCommentsQuerySchema,
} = require("../schemas/postsCommentsSchemas");

// GET /
async function getUserPostsComments(req, res, next, database) {
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };

    const userId = req.user._id;

    // validate query
    try {
        query = await postCommentsQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * limit;

    try {
        // find and return user comments
        const userLikedPosts = await database.getUserCommentsList(userId, skip, limit);
        return res.json(userLikedPosts);
    } catch (err) {
        next(err);
    }
}

// GET /:id
async function getPostComments(req, res, next, database) {
    let query = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };

    const postId = req.params.id;

    // validate post's id
    const isValidId = validateId(postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // validate query
    try {
        query = await postCommentsQuerySchema.validateAsync(query);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    const { page, limit } = query;
    const skip = (page - 1) * 10;

    try {
        // find related posts
        const postComments = await database.getPostCommentsList(postId, skip, limit);

        let formattedPostComments = postComments.map((postComment) => {
            if (postComment.user[0].googleId) {
                return {
                    ...postComment,
                    user: {
                        username: postComment.user[0]._json.name,
                        avatar: postComment.user[0]._json.picture,
                    },
                };
            }

            return {
                ...postComment,
                user: { username: postComment.user[0].username },
            };
        });

        return res.json(formattedPostComments);
    } catch (err) {
        next(err);
    }
}

// POST /
// req.body => description, postId
async function createNewPostComment(req, res, next, database) {
    let newPostComment = req.body;

    // validate request's body
    try {
        newPostComment = await postCommentSchema.validateAsync(newPostComment);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate post's id
    const isValidId = validateId(newPostComment.postId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    // set extra fields for new post comment
    newPostComment.userId = req.user._id;
    newPostComment.createdAt = Date.now();

    try {
        // make sure there is a post with this id in the database
        const post = await database.findPostById(newPostComment.postId);
        if (!post) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        // add new comment to database
        await database.addNewPostComment(newPostComment);

        // increment post's comment_count by 1
        await database.incrementPostCommentCount();

        // return success
        return res.json({ newCommentAdded: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deletePostComment(req, res, next, database) {
    const postId = req.params.id;
    const userId = req.user._id;

    // validate post comment's id
    const isValidId = validateId(postCommentId);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

    try {
        // find and delete post comment
        const result = await database.findAndDeletePostComment(postId, userId);

        if (!result) {
            return res.status(404).json({
                error: "no post comment with this id, for this user, was found!",
            });
        }

        // decrement post's comment count
        await database.decrementPostCommentCount(postId);

        // return success
        return res.json({ commentDeleted: true });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserPostsComments,
    getPostComments,
    createNewPostComment,
    deletePostComment,
};
