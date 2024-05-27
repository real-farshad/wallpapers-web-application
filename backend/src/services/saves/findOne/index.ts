import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import findSave from './findSave';
import validateWallpaperId from '@src/services/common/validateWallpaperId';

const findOne = async (wallpaperId: string, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const userId = user._id as ObjectId;
  const result = await findSave(wallpaperId, userId);

  return result;
};

export default findOne;
