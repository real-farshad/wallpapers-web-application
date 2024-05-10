import findAndDeleteUserWallpaper from '@src/repositories/wallpaper/findAndDeleteUserWallpaper';
import { CustomError } from '@src/utils/CustomError';

const deleteWallpaperFromDatabase = async (wallpaperId: string, publisherId: string) => {
  const sucess = await findAndDeleteUserWallpaper(wallpaperId, publisherId);

  if (!sucess) {
    const errorStatus = 404;
    const errorMessage = `A wallpaper with this id, for this publisher, doesn't exist!`;
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default deleteWallpaperFromDatabase;
