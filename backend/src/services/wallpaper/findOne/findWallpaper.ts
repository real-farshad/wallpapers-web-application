import findWallpaperInfo from '@src/repositories/wallpaper/findWallpaperInfo';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const findWallpaper = async (wallpaperId: string, userId?: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const wallpaper = await findWallpaperInfo(wallpaperObjectId, userId);

  if (!wallpaper) {
    const errorStatus = 404;
    const errorMessage = "A wallpaper with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return wallpaper;
};

export default findWallpaper;
