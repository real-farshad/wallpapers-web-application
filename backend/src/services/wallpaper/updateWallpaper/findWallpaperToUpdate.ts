import findWallpaperById from '@src/repositories/wallpaper/findWallpaperById';
import { CustomError } from '@src/utils/CustomError';

const findWallpaperToUpdate = async (id: string) => {
  const wallpaper = await findWallpaperById(id);

  if (!wallpaper) {
    const errorStatus = 404;
    const errorMessage = "A wallpaper with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return wallpaper;
};

export default findWallpaperToUpdate;
