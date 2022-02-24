const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsRecordsCollection = () =>
    getDatabase().collection("collections-records");

async function findUserCollectionRecord(collectionRecordId, userId) {
    let error, collectionRecord;

    try {
        collectionRecord = await getCollectionsRecordsCollection().findOne({
            _id: new ObjectId(collectionRecordId),
            userId: new ObjectId(userId),
        });

        error = null;
    } catch (err) {
        error = err;
        collectionRecord = null;
    }

    return [error, collectionRecord];
}

module.exports = findUserCollectionRecord;
