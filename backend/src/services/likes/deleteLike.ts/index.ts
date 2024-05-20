import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateWallpaperId from '../validateWallpaperId';
import deleteSaveFromDatabase from './deleteLikeFromDatabase';
import decrementWallpaperLikes from './decrementWallpaperLikes';

const deleteLike = async (wallpaperId: string, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const userId = user._id as ObjectId;
  const result = await deleteSaveFromDatabase(wallpaperId, userId);

  await decrementWallpaperLikes(wallpaperId);

  return result;
};

export default deleteLike;
