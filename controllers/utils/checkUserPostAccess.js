async function checkUserPostAccess(postId, userId, database) {
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

module.exports = checkUserPostAccess;
