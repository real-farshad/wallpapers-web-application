import findAndDeleteUserWallpaper from '@src/repositories/wallpaper/findAndDeleteUserWallpaper';
import { CustomError } from '@src/utils/CustomError';
import validateId from '@src/validations/validateId';

const deleteWallpaper = async (wallpaperId: string, publisherId: string) => {
  const { error, validId: validWallpaperId } = validateId(wallpaperId);
  if (error) throw new CustomError(400, 'Invalid wallpaper id!');

  const { success } = await findAndDeleteUserWallpaper(validWallpaperId as string, publisherId);
  if (!success) {
    const errorMessage = `A wallpaper with this id, for this publisher, doesn't exist!`;
    throw new CustomError(404, errorMessage);
  }
};

export default deleteWallpaper;
