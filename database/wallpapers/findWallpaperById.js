const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function findWallpaperById(wallpaperId) {
    let error;
    let wallpaper;

    try {
        const result = await getWallpapersCollection().findOne({
            _id: new ObjectId(wallpaperId),
        });

        if (!result) wallpaper = null;
        else wallpaper = result;

        error = null;
    } catch (err) {
        error = err;
        wallpaper = null;
    }

    return [error, wallpaper];
}

module.exports = findWallpaperById;
