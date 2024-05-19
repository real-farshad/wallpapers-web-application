import findWallpaperById from '@src/repositories/wallpaper/findWallpaperById';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const checkWallpaperExists = async (wallpaperId: string) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const wallpaper = await findWallpaperById(wallpaperObjectId);

  if (!wallpaper) {
    const errorStatus = 404;
    const errorMessage = "A wallpaper with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkWallpaperExists;
