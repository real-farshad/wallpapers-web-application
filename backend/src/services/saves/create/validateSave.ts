import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';
import { SavePayload } from '.';

const savePayloadSchema = Joi.object({
  wallpaperId: Joi.string().trim().min(3).max(32).required(),
});

const validateSave = (save: SavePayload): SavePayload => {
  const { error, value } = savePayloadSchema.validate(save);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  const isValidWallpaperId = ObjectId.isValid(value.wallpaperId);
  if (!isValidWallpaperId) {
    const errorStatus = 400;
    const errorMessage = 'Invalid wallpaper id!';
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateSave;
