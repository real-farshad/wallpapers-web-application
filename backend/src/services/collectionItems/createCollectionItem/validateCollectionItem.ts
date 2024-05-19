import { CustomError } from '@src/utils/CustomError';
import { CollectionItemPayload } from '.';
import Joi from 'joi';
import { ObjectId } from 'mongodb';

const collectionItemSchema = Joi.object({
  collectionId: Joi.string().trim().min(3).max(32).required(),
  wallpaperId: Joi.string().trim().min(3).max(32).required(),
});

const validateCollectionItem = (collectionItem: CollectionItemPayload): CollectionItemPayload => {
  const { error, value } = collectionItemSchema.validate(collectionItem);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  const isValidWallpaperId = ObjectId.isValid(value.wallpaperId);
  if (!isValidWallpaperId) {
    const errorStatus = 400;
    const errorMessage = 'Invalid wallpaperId!';
    throw new CustomError(errorStatus, errorMessage);
  }

  const isValidCollectionId = ObjectId.isValid(value.collectionId);
  if (!isValidCollectionId) {
    const errorStatus = 400;
    const errorMessage = 'Invalid collectionId!';
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCollectionItem;
