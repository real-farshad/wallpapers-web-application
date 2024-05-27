import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateWallpaperId from '../../common/validateWallpaperId';
import removeWallpaper from './removeWallpaper';
import decrementWallpaperLikesCount from './decrementWallpaperLikesCount';

const remove = async (wallpaperId: string, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const userId = user._id as ObjectId;
  const result = await removeWallpaper(wallpaperId, userId);

  await decrementWallpaperLikesCount(wallpaperId);

  return result;
};

export default remove;
