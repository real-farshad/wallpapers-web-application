import validateWallpaperId from '../validateWallpaperId';
import findUserLikeInDatabase from './findUserLikeInDatabase';

const checkLike = async (wallpaperId: string, user: any) => {
  validateWallpaperId(wallpaperId);

  const userId = user._id;
  const result = await findUserLikeInDatabase(wallpaperId, userId);

  return result;
};

export default checkLike;
