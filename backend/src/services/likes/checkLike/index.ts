import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateWallpaperId from '../validateWallpaperId';
import findUserLikeInDatabase from './findUserLikeInDatabase';

const checkLike = async (wallpaperId: string, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const userId = user._id as ObjectId;
  const result = await findUserLikeInDatabase(wallpaperId, userId);

  return result;
};

export default checkLike;
