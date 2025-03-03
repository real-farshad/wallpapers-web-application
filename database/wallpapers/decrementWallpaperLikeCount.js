const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function decrementWallpaperLikeCount(wallpaperId) {
  let error;

  try {
    await getWallpapersCollection().updateOne(
      { _id: ObjectId.createFromHexString(wallpaperId) },
      { $inc: { likeCount: -1 } }
    );
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = decrementWallpaperLikeCount;
