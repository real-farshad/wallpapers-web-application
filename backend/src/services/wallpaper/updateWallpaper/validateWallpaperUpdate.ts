import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { WallpaperUpdate } from '.';

const titleSchema = Joi.string().trim().min(3).max(64);

const srcUrlSchema = Joi.string().min(3).max(256);
const imageSchema = Joi.object().or('thumbnail', 'large').keys({
  thumbnail: srcUrlSchema,
  large: srcUrlSchema,
});

const categorySchema = Joi.string().lowercase().trim().min(3).max(32);

const updateSchema = Joi.object().or('title', 'image', 'category').keys({
  title: titleSchema,
  image: imageSchema,
  category: categorySchema,
});

const validateWallpaperUpdate = (update: WallpaperUpdate): WallpaperUpdate => {
  const { error, value } = updateSchema.validate(update);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateWallpaperUpdate;
