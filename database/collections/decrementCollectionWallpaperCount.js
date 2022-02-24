const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function decrementCollectionWallpaperCount(collectionId) {
    let error;

    try {
        await getCollectionsCollection().updateOne(
            { _id: new ObjectId(collectionId) },
            { $inc: { wallpaperCount: -1 } }
        );
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = decrementCollectionWallpaperCount;
