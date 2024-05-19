import validateWallpaperId from './validateWallpaperId';
import findWallpaperInDatabase from './findWallpaperInDatabase';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';

const getWallpaperDetails = async (wallpaperId: string, user?: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const userId = user && (user._id as ObjectId);
  const wallpaper = await findWallpaperInDatabase(wallpaperId, userId);

  return wallpaper;
};

export default getWallpaperDetails;
