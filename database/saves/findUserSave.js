const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getSavesCollection = () => getDatabase().collection("saves");

async function findUserSave(wallpaperId, userId) {
  let error, save;

  try {
    save = await getSavesCollection().findOne({
      wallpaperId: ObjectId.createFromHexString(wallpaperId),
      userId,
    });

    error = null;
  } catch (err) {
    error = err;
    save = null;
  }

  return [error, save];
}

module.exports = findUserSave;
