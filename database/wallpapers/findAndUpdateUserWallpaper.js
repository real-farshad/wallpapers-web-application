const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function findAndUpdateUserWallpaper(id, wallpaperUpdate, userId) {
    let error;
    let success;

    try {
        const result = await getWallpapersCollection().updateOne(
            { _id: new ObjectId(id), publisherId: new ObjectId(userId) },
            { $set: wallpaperUpdate }
        );

        if (result.matchedCount === 1) success = true;
        else success = false;

        error = null;
    } catch (err) {
        error = err;
        success = false;
    }

    return [error, success];
}

module.exports = findAndUpdateUserWallpaper;
