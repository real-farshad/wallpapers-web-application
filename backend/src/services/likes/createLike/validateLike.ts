import { CustomError } from '@src/utils/CustomError';
import { likeInput } from '.';
import { ObjectId } from 'mongodb';

const validateLike = (like: likeInput) => {
  const wallpaperId = like.wallpaperId;
  if (!wallpaperId) {
    const errorStatus = 400;
    const errorMessage = 'wallpaperId is required!';
    throw new CustomError(errorStatus, errorMessage);
  }

  const isValidWallpaperId = ObjectId.isValid(wallpaperId);
  if (!isValidWallpaperId) {
    const errorStatus = 400;
    const errorMessage = 'Invalid wallpaperId!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default validateLike;
