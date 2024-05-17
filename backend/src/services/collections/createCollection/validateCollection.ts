import Joi from 'joi';
import { CollectionPayload } from '@src/models/collectionModel';
import { CustomError } from '@src/utils/CustomError';

const collectionSchema = Joi.object({
  title: Joi.string().trim().min(3).max(64).required(),
});

const validateCollection = (collection: CollectionPayload) => {
  const { error, value } = collectionSchema.validate(collection);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCollection;
