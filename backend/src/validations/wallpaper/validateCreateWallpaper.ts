import Joi from 'joi';

const titleSchema = Joi.string().trim().min(3).max(64).required();

const srcUrlSchema = Joi.string().min(3).max(256).required();
const imageUrlSchema = Joi.object({
  thumbnail: srcUrlSchema,
  large: srcUrlSchema,
}).required();

const categorySchema = Joi.string().lowercase().trim().min(3).max(32).required();

const wallpaperSchema = Joi.object({
  title: titleSchema,
  imageUrl: imageUrlSchema,
  category: categorySchema,
});

const validateCreateWallpaper = (wallpaper: any) => {
  const { error, value } = wallpaperSchema.validate(wallpaper);
  if (error) return { error: error.details[0].message };

  return { validWallpaper: value };
};

export default validateCreateWallpaper;
