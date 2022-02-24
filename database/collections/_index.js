const saveCollection = require("./saveCollection");
const findCollectionById = require("./findCollectionById");
const findUserCollection = require("./findUserCollection");
const queryCollections = require("./queryCollections");
const incrementCollectionWallpaperCount = require("./incrementCollectionWallpaperCount");
const decrementCollectionWallpaperCount = require("./decrementCollectionWallpaperCount");
const deleteCollection = require("./deleteCollection");

module.exports = {
    saveCollection,
    findCollectionById,
    findUserCollection,
    queryCollections,
    incrementCollectionWallpaperCount,
    decrementCollectionWallpaperCount,
    deleteCollection,
};
