import validateWallpaperId from '../validateWallpaperId';
import findUserSaveInDatabase from './findUserSaveInDatabase';

const checkSave = async (wallpaperId: string, user: any) => {
  validateWallpaperId(wallpaperId);

  const userId = user._id;
  const result = await findUserSaveInDatabase(wallpaperId, userId);

  return result;
};

export default checkSave;
