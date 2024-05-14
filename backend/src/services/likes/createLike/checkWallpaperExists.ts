import findWallpaperById from '@src/repositories/wallpaper/findWallpaperById';
import { CustomError } from '@src/utils/CustomError';

const checkWallpaperExists = async (wallpaperId: string) => {
  const wallpaper = await findWallpaperById(wallpaperId);

  if (!wallpaper) {
    const errorStatus = 404;
    const errorMessage = "A wallpaper with this id doesn't exists!";
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkWallpaperExists;
