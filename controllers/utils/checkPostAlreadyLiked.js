async function checkPostAlreadyLiked(postId, userId, database) {
    try {
        const postAlreadyLiked = await database.findOnePostLike({
            postId,
            userId,
        });

        if (postAlreadyLiked) {
            const knownError = {
                knonw: true,
                status: 403,
                message: "post has already been liked!",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = checkPostAlreadyLiked;
