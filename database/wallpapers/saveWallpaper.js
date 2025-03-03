const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function saveWallpaper(wallpaper) {
  let error;

  try {
    await getWallpapersCollection().insertOne({
      ...wallpaper,
      categoryId: ObjectId.createFromHexString(wallpaper.categoryId),
      publisherId: ObjectId.createFromHexString(wallpaper.publisherId),
    });

    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = saveWallpaper;
