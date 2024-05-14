import findAndDeleteUserSave from '@src/repositories/saves/findAndDeleteUserSave';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const deleteSaveFromDatabase = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);

  const success = await findAndDeleteUserSave(wallpaperObjectId, userId);

  if (!success) {
    const errorStatus = 404;
    const errorMessage = "A save for this wallpaper, by this user, doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default deleteSaveFromDatabase;
