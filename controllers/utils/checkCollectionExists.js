async function checkCollectionExists({ collectionId, userId }, database) {
    try {
        const collection = await database.findUserCollectionById({
            collectionId,
            userId,
        });

        if (!collection) {
            const knownError = {
                known: true,
                status: 404,
                message:
                    "no collection with this id, for this user, was found!",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = checkCollectionExists;
