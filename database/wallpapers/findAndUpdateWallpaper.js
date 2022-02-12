const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function updateWallpaper(id, wallpaperUpdate) {
    let error;
    let success;

    try {
        const result = await getWallpapersCollection().updateOne(
            { _id: new ObjectId(id) },
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

module.exports = updateWallpaper;
