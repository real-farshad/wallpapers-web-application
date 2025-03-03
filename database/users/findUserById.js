const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getUsersCollection = () => getDatabase().collection("users");

async function findUserById(userId) {
  let error, user;

  try {
    user = await getUsersCollection().findOne({
      _id: ObjectId.createFromHexString(userId),
    });
    error = null;
  } catch (err) {
    error = err;
    user = null;
  }

  return [error, user];
}

module.exports = findUserById;
