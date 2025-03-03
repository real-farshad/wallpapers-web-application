const { getDatabase } = require("../../config/mongodb");
const getUsersCollection = () => getDatabase().collection("users");

async function insertOrUpdateUser(query, userUpdate) {
  let error, user;

  try {
    const result = await getUsersCollection().findOneAndUpdate(
      query,
      { $set: userUpdate },
      { upsert: true, returnDocument: "after" }
    );

    user = result;
    error = null;
  } catch (err) {
    error = err;
    user = null;
  }

  return [error, user];
}

module.exports = insertOrUpdateUser;
