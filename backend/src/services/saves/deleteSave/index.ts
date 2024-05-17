import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateWallpaperId from '../validateWallpaperId';
import deleteSaveFromDatabase from './deleteSaveFromDatabase';

const deleteSave = async (wallpaperId: string, user: User) => {
  validateWallpaperId(wallpaperId);

  const userId = user._id as ObjectId;
  const result = await deleteSaveFromDatabase(wallpaperId, userId);

  return result;
};

export default deleteSave;
