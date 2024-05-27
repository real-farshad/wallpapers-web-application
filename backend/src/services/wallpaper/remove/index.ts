import removeUserWallpaper from './removeUserWallpaper';
import { User } from '@src/models/userModel';
import validateWallpaperId from '@src/services/common/validateWallpaperId';
import { ObjectId } from 'mongodb';

const remove = async (wallpaperId: string, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const publisherId = user._id as ObjectId;
  const result = await removeUserWallpaper(wallpaperId, publisherId);

  return result;
};

export default remove;
