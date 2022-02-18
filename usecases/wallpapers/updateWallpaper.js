const validateId = require("../../validation/id");
const validateWallpaperUpdate = require("../../validation/wallpaperUpdate");

async function updateWallpaper(wallpaperId, wallpaperUpdate, userId, db) {
    const isValidId = await validateId(wallpaperId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid wallpaperId!",
        };
    }

    let [err, validUpdate] = await validateWallpaperUpdate(wallpaperUpdate);
    if (err) return { known: true, status: 400, message: err.message };

    let categoryTitle = validUpdate.category;
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

        validUpdate.categoryId = category._id;
        delete validUpdate.category;
    }

    let success;
    [err, success] = await db.findAndUpdateUserWallpaper(
        wallpaperId,
        validUpdate,
        userId
    );

    if (!success) {
        return {
            known: true,
            status: 404,
            message: "a wallpaper with this id, for this user, doesn't exist!",
        };
    }

    return null;
}

module.exports = updateWallpaper;
