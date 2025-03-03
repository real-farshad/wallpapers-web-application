const { getDatabase } = require("../../config/mongodb");
const getUsersCollection = () => getDatabase().collection("users");

async function deleteUser(userId) {
  let error;

  try {
    await getUsersCollection().deleteOne({
      _id: userId,
    });

    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = deleteUser;
