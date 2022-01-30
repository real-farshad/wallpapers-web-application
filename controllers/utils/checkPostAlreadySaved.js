async function checkPostAlreadySaved(postId, userId, database) {
    try {
        const postAlreadySaved = await database.findOnePostSave({
            postId,
            userId,
        });

        if (postAlreadySaved) {
            const knonwError = {
                known: true,
                status: 403,
                message: "post has already been saved!",
            };

            return knonwError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = checkPostAlreadySaved;
