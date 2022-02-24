const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsRecordsCollection = () =>
    getDatabase().collection("collections-records");

async function deleteCollectionRecord(collectionRecordId) {
    let error;

    try {
        await getCollectionsRecordsCollection().deleteOne({
            _id: new ObjectId(collectionRecordId),
        });

        error = null;
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = deleteCollectionRecord;
