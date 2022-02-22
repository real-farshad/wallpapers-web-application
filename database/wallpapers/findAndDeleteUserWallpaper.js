const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function findAndDeleteUserWallpaper(wallpaperId, userId) {
    let error, success;

    try {
        const result = await getWallpapersCollection().deleteOne({
            _id: new ObjectId(wallpaperId),
            publisherId: new ObjectId(userId),
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

module.exports = findAndDeleteUserWallpaper;
