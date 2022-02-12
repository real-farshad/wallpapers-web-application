const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function saveWallpaper(wallpaper) {
    let error;

    try {
        await getWallpapersCollection().insertOne({
            ...wallpaper,
            categoryId: new ObjectId(wallpaper.categoryId),
        });

        error = null;
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = saveWallpaper;
