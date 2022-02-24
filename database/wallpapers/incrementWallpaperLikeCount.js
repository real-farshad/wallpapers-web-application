const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function incrementWallpaperLikeCount(wallpaperId) {
    let error;

    try {
        await getWallpapersCollection().updateOne(
            { _id: new ObjectId(wallpaperId) },
            { $inc: { likeCount: 1 } }
        );
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = incrementWallpaperLikeCount;
