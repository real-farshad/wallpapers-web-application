const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCommentsCollection = () => getDatabase().collection("comments");

async function saveComment(comment) {
  let error;

  try {
    await getCommentsCollection().insertOne({
      ...comment,
      wallpaperId: ObjectId.createFromHexString(comment.wallpaperId),
    });

    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = saveComment;
