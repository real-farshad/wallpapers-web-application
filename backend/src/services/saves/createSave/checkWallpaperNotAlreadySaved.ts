import { CustomError } from '@src/utils/CustomError';
import findSaveByWallpaperAndUserIds from '@repositories/saves/findSaveByWallpaperAndUserIds';
import { ObjectId } from 'mongodb';

const checkWallpaperNotAlreadySaved = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const save = await findSaveByWallpaperAndUserIds(wallpaperObjectId, userId);

  if (save) {
    const errorStatus = 400;
    const errorMessage = 'This wallpaper has already been saved by this user!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkWallpaperNotAlreadySaved;
