import Joi from 'joi';
import { wallpaperInput } from '.';
import { CustomError } from '@src/utils/CustomError';

const titleSchema = Joi.string().trim().min(3).max(64).required();

const srcUrlSchema = Joi.string().min(3).max(256).required();
const imageSchema = Joi.object({
  thumbnail: srcUrlSchema,
  large: srcUrlSchema,
}).required();

const categorySchema = Joi.string().lowercase().trim().min(3).max(32).required();

const wallpaperSchema = Joi.object({
  title: titleSchema,
  image: imageSchema,
  category: categorySchema,
});

const validateWallpaper = (wallpaper: wallpaperInput) => {
  const { error, value } = wallpaperSchema.validate(wallpaper);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateWallpaper;
