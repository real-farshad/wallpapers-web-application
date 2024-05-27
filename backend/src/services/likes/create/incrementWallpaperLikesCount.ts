import { ObjectId } from 'mongodb';
import { CustomError } from '@src/utils/CustomError';
import incrementLikesCount from '@repositories/wallpaper/incrementLikesCount';

const incrementWallpaperLikesCount = async (wallpaperId: ObjectId) => {
  const success = await incrementLikesCount(wallpaperId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = "Unable to increment wallpaper's like count! please try again later.";
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default incrementWallpaperLikesCount;
