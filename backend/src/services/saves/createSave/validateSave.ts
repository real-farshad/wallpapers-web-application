import { CustomError } from '@src/utils/CustomError';
import { saveInput } from '.';
import { ObjectId } from 'mongodb';

const validateSave = (save: saveInput) => {
  const wallpaperId = save.wallpaperId;
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

export default validateSave;
