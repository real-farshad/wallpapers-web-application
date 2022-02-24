const saveWallpaper = require("./saveWallpaper");
const findWallpaperById = require("./findWallpaperById");
const queryWallpapers = require("./queryWallpapers");
const findAndUpdateUserWallpaper = require("./findAndUpdateUserWallpaper");
const findAndDeleteUserWallpaper = require("./findAndDeleteUserWallpaper");
const incrementWallpaperLikeCount = require("./incrementWallpaperLikeCount");
const decrementWallpaperLikeCount = require("./decrementWallpaperLikeCount");

module.exports = {
    saveWallpaper,
    findWallpaperById,
    queryWallpapers,
    findAndUpdateUserWallpaper,
    findAndDeleteUserWallpaper,
    incrementWallpaperLikeCount,
    decrementWallpaperLikeCount,
};
