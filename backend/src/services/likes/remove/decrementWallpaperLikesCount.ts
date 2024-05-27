import { ObjectId } from 'mongodb';
import { CustomError } from '@src/utils/CustomError';
import decrementLikesCount from '@repositories/wallpaper/decrementLikesCount';

const decrementWallpaperLikesCount = async (wallpaperId: string) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const success = await decrementLikesCount(wallpaperObjectId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = "Unable to increment wallpaper's like count! please try again later.";
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default decrementWallpaperLikesCount;
