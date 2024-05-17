import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateWallpaperId from '../validateWallpaperId';
import findUserSaveInDatabase from './findUserSaveInDatabase';

const checkSave = async (wallpaperId: string, user: User) => {
  validateWallpaperId(wallpaperId);

  const userId = user._id as ObjectId;
  const result = await findUserSaveInDatabase(wallpaperId, userId);

  return result;
};

export default checkSave;
