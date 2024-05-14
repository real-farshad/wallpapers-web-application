import { ObjectId } from 'mongodb';
import { CustomError } from '@src/utils/CustomError';
import incrementWallpaperLikeCount from '@repositories/wallpaper/incrementWallpaperLikeCount';

const incrementWallpaperLikes = async (wallpaperId: ObjectId) => {
  const success = await incrementWallpaperLikeCount(wallpaperId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = "Unable to increment wallpaper's like count! please try again later.";
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default incrementWallpaperLikes;
