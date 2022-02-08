const Joi = require("joi");

const wallpaperSchema = Joi.object({
    imageUrl: Joi.object({
        thumbnail: Joi.string().min(3).max(256).required(),
        large: Joi.string().min(3).max(256).required(),
    }),
    title: Joi.string().trim().min(3).max(64).required(),
    category: Joi.string().lowercase().trim().min(3).max(32).required(),
});

async function validateWallpaper(wallpaper) {
    try {
        const validWallpaper = await wallpaperSchema.validateAsync(wallpaper);
        return [null, validWallpaper];
    } catch (err) {
        return [err, null];
    }
}

module.exports = validateWallpaper;
