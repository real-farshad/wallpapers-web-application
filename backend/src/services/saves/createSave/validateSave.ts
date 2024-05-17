import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';
import { SavePayload } from '@src/models/saveModel';

const validateSave = (save: SavePayload) => {
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
