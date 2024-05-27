import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { WallpaperUpdate } from '.';

const titleSchema = Joi.string().trim().min(3).max(64).optional();

const srcUrlSchema = Joi.string().min(3).max(256).optional();
const imageSchema = Joi.object()
  .or('thumbnail', 'large')
  .keys({
    thumbnail: srcUrlSchema,
    large: srcUrlSchema,
  })
  .optional();

const categorySchema = Joi.string().trim().min(3).max(32).optional();

const wallpaperUpdateSchema = Joi.object().or('title', 'image', 'category').keys({
  title: titleSchema,
  image: imageSchema,
  category: categorySchema,
});

const validateWallpaperUpdate = (update: WallpaperUpdate): WallpaperUpdate => {
  const { error, value } = wallpaperUpdateSchema.validate(update);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateWallpaperUpdate;
