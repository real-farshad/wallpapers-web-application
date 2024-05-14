import findAndDeleteUserLike from '@src/repositories/likes/findAndDeleteUserLike';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const deleteLikeFromDatabase = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);

  const success = await findAndDeleteUserLike(wallpaperObjectId, userId);

  if (!success) {
    const errorStatus = 404;
    const errorMessage = "A like for this wallpaper, by this user, doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default deleteLikeFromDatabase;
