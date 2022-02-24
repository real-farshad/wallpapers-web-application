const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsRecordsCollection = () =>
    getDatabase().collection("collections-records");

async function saveCollectionRecord(collectionRecord) {
    let error;

    try {
        await getCollectionsRecordsCollection().insertOne({
            ...collectionRecord,
            collectionId: new ObjectId(collectionRecord.collectionId),
            wallpaperId: new ObjectId(collectionRecord.wallpaperId),
        });

        error = null;
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = saveCollectionRecord;
