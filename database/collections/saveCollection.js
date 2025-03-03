const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function saveCollection(collection) {
  let error;

  try {
    await getCollectionsCollection().insertOne(collection);
    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = saveCollection;
