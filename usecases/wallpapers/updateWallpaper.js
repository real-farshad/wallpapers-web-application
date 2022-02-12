const validateId = require("../../utils/validateId");
const validateWallpaperUpdate = require("../../validation/wallpaperUpdate");

async function updateWallpaper(wallpaperId, wallpaperUpdate, db) {
    const isValidId = validateId(wallpaperId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid wallpaper id!",
        };
    }

    let [err, update] = await validateWallpaperUpdate(wallpaperUpdate);
    if (err) return { known: true, status: 400, message: err.message };

    let categoryTitle = update.category;
    if (categoryTitle) {
        let category;
        [err, category] = await db.findCategoryByTitle(categoryTitle);
        if (err) return err;

        if (!category) {
            return {
                known: true,
                status: 404,
                message: "a category with this title doesn't exist!",
            };
        }

        update.categoryId = category._id;
        delete update.category;
    }

    let success;
    [err, success] = await db.findAndUpdateWallpaper(wallpaperId, update);

    if (!success) {
        return {
            known: true,
            status: 404,
            message: "a wallpaper with this id doesn't exist!",
        };
    }

    return null;
}

module.exports = updateWallpaper;
