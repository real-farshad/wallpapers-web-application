const validateId = require("../utils/validateId");

// GET /:id
async function getSinglePost(req, res, next, database) {
    const isValidId = validateId(req.params.id);
    if (!isValidId) return res.status(403).json({ error: "invalid post id!" });

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
