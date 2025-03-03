const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsRecordsCollection = () =>
  getDatabase().collection("collections-records");

async function deleteManyCollectionRecords(collectionId) {
  let error;

  try {
    await getCollectionsRecordsCollection().deleteMany({
      collectionId: ObjectId.createFromHexString(collectionId),
    });

    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = deleteManyCollectionRecords;
