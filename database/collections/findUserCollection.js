const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function findUserCollection(collectionId, userId) {
  let error, collection;

  try {
    collection = await getCollectionsCollection().findOne({
      _id: ObjectId.createFromHexString(collectionId),
      userId,
    });

    error = null;
  } catch (err) {
    error = err;
    collection = null;
  }

  return [error, collection];
}

module.exports = findUserCollection;
