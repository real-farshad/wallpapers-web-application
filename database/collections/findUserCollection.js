const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function findUserCollection(collectionId, userId) {
    let error, collection;

    try {
        collection = await getCollectionsCollection().findOne({
            _id: new ObjectId(collectionId),
            userId: new ObjectId(userId),
        });

        error = null;
    } catch (err) {
        error = err;
        collection = null;
    }

    return [error, collection];
}

module.exports = findUserCollection;
