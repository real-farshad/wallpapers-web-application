const handleError = require("./utils/handleError");
const validatePostId = require("./utils/validatePostId");

// GET /:id
async function getSinglePost(req, res, next, database) {
    const err = validatePostId(req.params.id);
    if (err) return handleError(err, res, next);

    try {
        const post = await database.findPostById(req.params.id);
        if (!post) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        return res.json(post);
    } catch (err) {
        return next(err);
    }
}

module.exports = getSinglePost;
