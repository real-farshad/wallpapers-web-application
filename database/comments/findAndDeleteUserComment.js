const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCommentsCollection = () => getDatabase().collection("comments");

async function findAndDeleteUserComment(commentId, userId) {
  let error, success;

  try {
    const result = await getCommentsCollection().deleteOne({
      _id: ObjectId.createFromHexString(commentId),
      userId,
    });

    if (result.deletedCount !== 1) success = false;
    else success = true;

    error = null;
  } catch (err) {
    error = err;
    success = false;
  }

  return [error, success];
}

module.exports = findAndDeleteUserComment;
