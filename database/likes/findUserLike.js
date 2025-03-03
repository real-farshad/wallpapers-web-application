const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getLikesCollection = () => getDatabase().collection("likes");

async function findUserLike(wallpaperId, userId) {
  let error, like;

  try {
    like = await getLikesCollection().findOne({
      wallpaperId: ObjectId.createFromHexString(wallpaperId),
      userId,
    });

    error = null;
  } catch (err) {
    error = err;
    like = null;
  }

  return [error, like];
}

module.exports = findUserLike;
