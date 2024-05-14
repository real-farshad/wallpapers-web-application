import validateWallpaperId from '../validateWallpaperId';
import deleteSaveFromDatabase from './deleteSaveFromDatabase';

const deleteSave = async (wallpaperId: string, user: any) => {
  validateWallpaperId(wallpaperId);

  const userId = user._id;
  const result = await deleteSaveFromDatabase(wallpaperId, userId);

  return result;
};

export default deleteSave;
