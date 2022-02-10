const Joi = require("joi");

const wallpaperUpdateSchema = Joi.object({
    title: Joi.string().trim().min(3).max(64),
    imageUrl: Joi.object({
        thumbnail: Joi.string().min(3).max(256),
        large: Joi.string().min(3).max(256),
    }).not({}),
    category: Joi.string().lowercase().trim().min(3).max(32),
}).not({});

async function validateWallpaperUpdate(wallpaperUpdate) {
    try {
        const validWallpaperUpdate = await wallpaperUpdateSchema.validateAsync(
            wallpaperUpdate
        );

        return [null, validWallpaperUpdate];
    } catch (err) {
        return [err, null];
    }
}

module.exports = validateWallpaperUpdate;
