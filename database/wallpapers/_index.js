const saveWallpaper = require("./saveWallpaper");
const findWallpaperById = require("./findWallpaperById");
const getWallpapersCount = require("./getWallpapersCount");
const queryWallpapers = require("./queryWallpapers");
const findAndUpdateUserWallpaper = require("./findAndUpdateUserWallpaper");
const findAndDeleteUserWallpaper = require("./findAndDeleteUserWallpaper");
const incrementWallpaperLikeCount = require("./incrementWallpaperLikeCount");
const decrementWallpaperLikeCount = require("./decrementWallpaperLikeCount");

module.exports = {
    saveWallpaper,
    findWallpaperById,
    getWallpapersCount,
    queryWallpapers,
    findAndUpdateUserWallpaper,
    findAndDeleteUserWallpaper,
    incrementWallpaperLikeCount,
    decrementWallpaperLikeCount,
};
