const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function getWallpapersCount(query) {
  let error, wallpapersCount;

  try {
    let { title, categoryId, duration } = query;

    const match = {};
    if (title) match.$text = { $search: title };
    if (categoryId) match.categoryId = ObjectId.createFromHexString(categoryId);
    if (duration) {
      const standardTime = new Date(`1-1-${duration}`).getTime();
      match.createdAt = { $gt: standardTime };
    }

    wallpapersCount = await getWallpapersCollection().countDocuments(match);
    error = null;
  } catch (err) {
    error = err;
    wallpapersCount = null;
  }

  return [error, wallpapersCount];
}

module.exports = getWallpapersCount;
