const handleError = require("./utils/handleError");
const validatePostId = require("./utils/validatePostId");

async function getSinglePost(req, res, next, database) {
    const postId = req.params.id;

    let err = validatePostId(postId);
    if (err) return handleError(err, res, next);

    let post;
    [err, post] = await getSinglePostFromDatabase(postId, database);
    if (err) return handleError(err, res, next);

    return res.json(post);
}

async function getSinglePostFromDatabase(postId, database) {
    try {
        const post = await database.findPostById(postId);
        if (!post) {
            const knownError = {
                known: true,
                status: 404,
                message: "no post with this id was found!",
            };

            return [knownError, null];
        }

        return [null, post];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getSinglePost;
