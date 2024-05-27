import { User } from '@src/models/userModel';
import { Wallpaper } from '@src/models/wallpaperModel';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const ensureUserIsWallpaperPublisher = (wallpaper: Wallpaper, user: User) => {
  const publisherId = wallpaper.publisherId;
  const userId = user._id as ObjectId;

  const hasCorrectPublisher = publisherId.toString() === userId.toString();

  if (!hasCorrectPublisher) {
    const errorStatus = 403;
    const errorMessage = 'Only the publisher of the wallpaper can update it!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default ensureUserIsWallpaperPublisher;
