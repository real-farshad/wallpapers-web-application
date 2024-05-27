import deleteUserLike from '@src/repositories/likes/deleteUserLike';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const removeWallpaper = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);

  const success = await deleteUserLike(wallpaperObjectId, userId);

  if (!success) {
    const errorStatus = 404;
    const errorMessage = "A like for this wallpaper, by this user, doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default removeWallpaper;
