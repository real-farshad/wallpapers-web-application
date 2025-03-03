const { getDatabase } = require("../../config/mongodb");
const getSavesCollection = () => getDatabase().collection("saves");

async function getUserSavesCount(userId) {
  let error, userSavesCount;

  try {
    userSavesCount = await getSavesCollection().countDocuments({
      userId,
    });

    error = null;
  } catch (err) {
    error = err;
    userSavesCount = null;
  }

  return [error, userSavesCount];
}

module.exports = getUserSavesCount;
