const saveCollection = require("./saveCollection");
const findCollectionById = require("./findCollectionById");
const findUserCollection = require("./findUserCollection");
const getCollectionsCount = require("./getCollectionsCount");
const queryCollections = require("./queryCollections");
const incrementCollectionWallpaperCount = require("./incrementCollectionWallpaperCount");
const decrementCollectionWallpaperCount = require("./decrementCollectionWallpaperCount");
const deleteCollection = require("./deleteCollection");

module.exports = {
    saveCollection,
    findCollectionById,
    findUserCollection,
    getCollectionsCount,
    queryCollections,
    incrementCollectionWallpaperCount,
    decrementCollectionWallpaperCount,
    deleteCollection,
};
