import findCategoryByTitle from '@src/repositories/category/findCategoryByTitle';
import saveWallpaper from '@repositories/wallpaper/saveWallpaper';
import { CustomError } from '@utils/CustomError';
import validateCreateWallpaper from '@validations/wallpaper/validateCreateWallpaper';
import { Wallpaper } from '@src/models/wallpaperModel';
import { ObjectId } from 'mongodb';

const createWallpaper = async (wallpaper: any, publisherId: string) => {
  const { error, validWallpaper } = validateCreateWallpaper(wallpaper);
  if (error) throw new CustomError(400, error);

  const category = await findCategoryByTitle(wallpaper.category);
  if (!category) throw new CustomError(404, `A category with this id doesn't exist!`);

  const newWallpaper: Wallpaper = {
    title: validWallpaper.title,
    imageUrl: validWallpaper.image,
    publisherId: new ObjectId(publisherId),
    categoryId: category._id,
    likeCount: 0,
    createdAt: Date.now(),
  };

  const savedWallpaper = await saveWallpaper(newWallpaper);
  return savedWallpaper;
};

export default createWallpaper;
