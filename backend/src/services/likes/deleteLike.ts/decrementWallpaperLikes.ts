import { ObjectId } from 'mongodb';
import { CustomError } from '@src/utils/CustomError';
import decrementWallpaperLikeCount from '@repositories/wallpaper/decrementWallpaperLikeCount';

const decrementWallpaperLikes = async (wallpaperId: string) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const success = await decrementWallpaperLikeCount(wallpaperObjectId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = "Unable to increment wallpaper's like count! please try again later.";
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default decrementWallpaperLikes;
