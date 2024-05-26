import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { WallpaperPayload } from '.';

const titleSchema = Joi.string().trim().min(3).max(64).required();

const srcUrlSchema = Joi.string().min(3).max(256).required();
const imageSchema = Joi.object({
  thumbnail: srcUrlSchema,
  large: srcUrlSchema,
}).required();

const categorySchema = Joi.string().trim().min(3).max(32).required();

const wallpaperPayloadSchema = Joi.object({
  title: titleSchema,
  image: imageSchema,
  category: categorySchema,
});

const validateWallpaper = (wallpaper: WallpaperPayload): WallpaperPayload => {
  const { error, value } = wallpaperPayloadSchema.validate(wallpaper);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateWallpaper;
