const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function findCollectionById(collectionId) {
    let error, collection;

    try {
        const result = await getCollectionsCollection().findOne({
            _id: new ObjectId(collectionId),
        });

        if (!result) collection = null;
        else collection = result;

        error = null;
    } catch (err) {
        error = err;
        collection = null;
    }

    return [error, collection];
}

module.exports = findCollectionById;
