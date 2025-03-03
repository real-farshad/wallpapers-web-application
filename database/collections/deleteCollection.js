const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function deleteCollection(collectionId) {
  let error;

  try {
    await getCollectionsCollection().deleteOne({
      _id: ObjectId.createFromHexString(collectionId),
    });

    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = deleteCollection;
