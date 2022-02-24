const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function saveCollection(collection) {
    let error;

    try {
        await getCollectionsCollection().insertOne({
            ...collection,
            userId: new ObjectId(collection.userId),
        });

        error = null;
    } catch (err) {
        error = err;
    }

    return error;
}

module.exports = saveCollection;
