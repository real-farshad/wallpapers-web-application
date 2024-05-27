import { CustomError } from '@src/utils/CustomError';
import findUserSaveByWallpaperId from '@repositories/saves/findUserSaveByWallpaperId';
import { ObjectId } from 'mongodb';

const ensureWallpaperNotAlreadySaved = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const save = await findUserSaveByWallpaperId(wallpaperObjectId, userId);

  if (save) {
    const errorStatus = 409;
    const errorMessage = 'This wallpaper has already been saved by this user!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default ensureWallpaperNotAlreadySaved;
