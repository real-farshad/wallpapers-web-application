const { getDatabase } = require("../../config/mongodb");
const getUsersCollection = () => getDatabase().collection("users");

async function saveUser(user) {
  let error;

  try {
    await getUsersCollection().insertOne(user);
    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = saveUser;
