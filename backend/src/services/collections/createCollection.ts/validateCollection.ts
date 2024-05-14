import Joi from 'joi';
import { collectionInput } from '.';
import { CustomError } from '@src/utils/CustomError';

const collectionSchema = Joi.object({
  title: Joi.string().lowercase().trim().min(3).max(64).required(),
});

const validateCollection = (collection: collectionInput) => {
  const { error, value } = collectionSchema.validate(collection);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCollection;
