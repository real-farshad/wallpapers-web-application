const Joi = require("joi");

const wallpaperSchema = Joi.object({
    title: Joi.string().trim().min(3).max(64).required(),
    imageUrl: Joi.object({
        thumbnail: Joi.string().min(3).max(256).required(),
        large: Joi.string().min(3).max(256).required(),
    }).required(),
    category: Joi.string().lowercase().trim().min(3).max(32).required(),
});

async function validateWallpaper(wallpaper) {
    let error, validWallpaper;

    try {
        validWallpaper = await wallpaperSchema.validateAsync(wallpaper);
        error = null;
    } catch (err) {
        error = err;
        validWallpaper = null;
    }

    return [error, validWallpaper];
}

module.exports = validateWallpaper;
