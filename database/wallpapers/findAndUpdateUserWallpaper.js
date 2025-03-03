const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function findAndUpdateUserWallpaper(
  wallpaperId,
  wallpaperUpdate,
  userId
) {
  let error, success;

  try {
    const result = await getWallpapersCollection().updateOne(
      {
        _id: ObjectId.createFromHexString(wallpaperId),
        publisherId: userId,
      },
      {
        $set: {
          ...wallpaperUpdate,
          categoryId: ObjectId.createFromHexString(wallpaperUpdate.categoryId),
        },
      }
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
