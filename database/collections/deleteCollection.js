const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function deleteCollection(collectionId) {
    let error;

    try {
        await getCollectionsCollection().deleteOne({
            _id: new ObjectId(collectionId),
        });

        error = null;
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = deleteCollection;
