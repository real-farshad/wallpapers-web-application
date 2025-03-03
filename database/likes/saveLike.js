const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getLikesCollection = () => getDatabase().collection("likes");

async function saveLike(like) {
  let error;

  try {
    await getLikesCollection().insertOne({
      ...like,
      wallpaperId: ObjectId.createFromHexString(like.wallpaperId),
    });

    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = saveLike;
