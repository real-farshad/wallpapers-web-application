import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { CollectionUpdate } from '.';

const collectionUpdateSchema = Joi.object({
  title: Joi.string().trim().min(3).max(64).required(),
});

const validateCollectionUpdate = (collection: CollectionUpdate): CollectionUpdate => {
  const { error, value } = collectionUpdateSchema.validate(collection);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCollectionUpdate;
