import deleteUserSave from '@src/repositories/saves/deleteUserSave';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const removeWallpaper = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);

  const success = await deleteUserSave(wallpaperObjectId, userId);

  if (!success) {
    const errorStatus = 404;
    const errorMessage = "A save for this wallpaper, by this user, doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default removeWallpaper;
