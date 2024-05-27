import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import removeWallpaper from './removeWallpaper';
import validateWallpaperId from '@src/services/common/validateWallpaperId';

const remove = async (wallpaperId: string, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const userId = user._id as ObjectId;
  const result = await removeWallpaper(wallpaperId, userId);

  return result;
};

export default remove;
