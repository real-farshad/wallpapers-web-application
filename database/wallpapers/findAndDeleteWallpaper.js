const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function findAndDeleteWallpaper(wallpaperId) {
    let error;
    let success;

    try {
        const result = await getWallpapersCollection().deleteOne({
            _id: new ObjectId(wallpaperId),
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

module.exports = findAndDeleteWallpaper;
