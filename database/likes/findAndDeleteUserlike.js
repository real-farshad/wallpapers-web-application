const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getLikesCollection = () => getDatabase().collection("likes");

async function findAndDeleteUserLike(likeId, userId) {
    let error, success;

    try {
        const result = await getLikesCollection().deleteOne({
            _id: new ObjectId(likeId),
            userId: new ObjectId(userId),
        });

        if (result.deletedCount !== 1) success = false;
        else success = true;

        error = null;
    } catch (err) {
        error = err;
        success = false;
    }

    return [error, success];
}

module.exports = findAndDeleteUserLike;
