import findLikeByWallpaperAndUserIds from '@src/repositories/likes/findLikeByWallpaperAndUserIds';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const checkWallpaperNotAlreadyLiked = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const like = await findLikeByWallpaperAndUserIds(wallpaperObjectId, userId);

  if (like) {
    const errorStatus = 400;
    const errorMessage = 'This wallpaper has already been liked by this user!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkWallpaperNotAlreadyLiked;
