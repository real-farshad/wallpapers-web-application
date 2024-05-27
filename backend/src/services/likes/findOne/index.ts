import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateWallpaperId from '../../common/validateWallpaperId';
import findLike from './findLike';

const findOne = async (wallpaperId: string, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const userId = user._id as ObjectId;
  const result = await findLike(wallpaperId, userId);

  return result;
};

export default findOne;
