import findWallpaper from './findWallpaper';
import { User } from '@src/models/userModel';
import validateWallpaperId from '@src/services/common/validateWallpaperId';
import { ObjectId } from 'mongodb';

const findOne = async (wallpaperId: string, user?: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const userId = user && (user._id as ObjectId);
  const wallpaper = await findWallpaper(wallpaperId, userId);

  return wallpaper;
};

export default findOne;
