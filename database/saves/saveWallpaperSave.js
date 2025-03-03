const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getSavesCollection = () => getDatabase().collection("saves");

async function saveWallpaperSave(save) {
  let error;

  try {
    await getSavesCollection().insertOne({
      ...save,
      wallpaperId: ObjectId.createFromHexString(save.wallpaperId),
    });

    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = saveWallpaperSave;
