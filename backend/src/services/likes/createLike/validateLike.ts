import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';
import { LikePayload } from '@src/models/likeModel';

const validateLike = (like: LikePayload) => {
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
