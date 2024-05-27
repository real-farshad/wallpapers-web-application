import findUserLikeByWallpaperId from '@src/repositories/likes/findUserLikeByWallpaperId';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const ensureWallpaperNotAlreadyLiked = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const like = await findUserLikeByWallpaperId(wallpaperObjectId, userId);

  if (like) {
    const errorStatus = 409;
    const errorMessage = 'This wallpaper has already been liked by this user!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default ensureWallpaperNotAlreadyLiked;
