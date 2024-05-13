import findWallpaperByIdAndPublisher from '@src/repositories/wallpaper/findWallpaperByIdAndPublisher';
import { CustomError } from '@src/utils/CustomError';

const findWallpaperInDatabase = async (wallpaperId: string, userId?: string) => {
  const wallpaper = await findWallpaperByIdAndPublisher(wallpaperId, userId);

  if (!wallpaper) {
    const errorStatus = 404;
    const errorMessage = "A wallpaper with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return wallpaper;
};

export default findWallpaperInDatabase;
