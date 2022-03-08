const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getLikesCollection = () => getDatabase().collection("likes");

async function findAndDeleteUserLike(wallpaperId, userId) {
    let error, success;

    try {
        const result = await getLikesCollection().deleteOne({
            wallpaperId: new ObjectId(wallpaperId),
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
