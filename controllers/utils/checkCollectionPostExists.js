async function checkCollectionPostExists(collectionPostId, database) {
    try {
        const collectionPost = await database.findCollectionPostById(
            collectionPostId
        );

        if (!collectionPost) {
            const knownError = {
                known: true,
                status: 404,
                message: "no collection post with this id was found!",
            };

            return [knownError, null];
        }

        return [null, collectionPost];
    } catch (err) {
        return [err, null];
    }
}

module.exports = checkCollectionPostExists;
