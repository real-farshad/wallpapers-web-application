const { getDatabase } = require("../../config/mongodb");
const getCollectionsCollection = () => getDatabase().collection("collections");

async function getCollectionsCount(query) {
    let error, collectionsCount;

    try {
        const { title } = query;
        const match = title ? { $text: { $search: title } } : {};

        collectionsCount = await getCollectionsCollection().countDocuments(
            match
        );
        error = null;
    } catch (err) {
        error = err;
        collectionsCount = null;
    }

    return [error, collectionsCount];
}

module.exports = getCollectionsCount;
