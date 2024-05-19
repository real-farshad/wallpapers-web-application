import validateWallpaperId from './validateWallpaperId';
import deleteWallpaperFromDatabase from './deleteWallpaperFromDatabase';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';

const deleteWallpaper = async (wallpaperId: string, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  const publisherId = user._id as ObjectId;
  const result = await deleteWallpaperFromDatabase(wallpaperId, publisherId);

  return result;
};

export default deleteWallpaper;
