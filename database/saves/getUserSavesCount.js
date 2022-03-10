const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getSavesCollection = () => getDatabase().collection("saves");

async function getUserSavesCount(userId) {
    let error, userSavesCount;

    try {
        userSavesCount = await getSavesCollection().countDocuments({
            userId: new ObjectId(userId),
        });

        error = null;
    } catch (err) {
        error = err;
        userSavesCount = null;
    }

    return [error, userSavesCount];
}

module.exports = getUserSavesCount;
