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

    let [err, validWallpaperUpdate] = await validateWallpaperUpdate(
        wallpaperUpdate
    );
    if (err) return { known: true, status: 400, message: err.message };

    let categoryTitle = validWallpaperUpdate.category;
    if (categoryTitle) {
        let category;
        [err, category] = await db.findCategoryByTitle(categoryTitle);
        if (err) return err;

        if (!category) {
            return {
                known: true,
                status: 404,
                message: "no category with this title was found!",
            };
        }

        validWallpaperUpdate.categoryId = category._id;
        delete validWallpaperUpdate.category;
    }

    let success;
    [err, success] = await db.findAndUpdateWallpaper(
        wallpaperId,
        validWallpaperUpdate
    );

    if (!success) {
        return {
            known: true,
            status: 404,
            message: "no wallpaper with this id was found!",
        };
    }

    return null;
}

module.exports = updateWallpaper;
