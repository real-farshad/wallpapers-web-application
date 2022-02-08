const validateWallpaper = require("../../validation/wallpaper");

async function createWallpaper(wallpaper, db) {
    let [err, validWallpaper] = await validateWallpaper(wallpaper);
    if (err) return { known: true, status: 400, message: err.message };

    let category;
    [err, category] = await db.findCategoryByTitle(validWallpaper.category);
    if (err) return err;

    if (!category) {
        return {
            known: true,
            status: 404,
            message: "no category with this title was found!",
        };
    }

    validWallpaper.categoryId = category._id;
    delete validWallpaper.category;

    validWallpaper.likeCount = 0;
    validWallpaper.createdAt = Date.now();

    err = await db.saveWallpaper(validWallpaper);
    if (err) return err;

    return null;
}

module.exports = createWallpaper;
