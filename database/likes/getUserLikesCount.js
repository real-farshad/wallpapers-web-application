const { getDatabase } = require("../../config/mongodb");
const getLikesCollection = () => getDatabase().collection("likes");

async function getUserLikesCount(userId) {
  let error, userLikesCount;

  try {
    userLikesCount = await getLikesCollection().countDocuments({
      userId,
    });

    error = null;
  } catch (err) {
    error = err;
    userLikesCount = null;
  }

  return [error, userLikesCount];
}

module.exports = getUserLikesCount;
