import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { CollectionItemsQuery } from '.';

const collectionItemsQuerySchema = Joi.object({
  page: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(0).max(20).optional(),
});

const validateCollectionItemsQuery = (query: CollectionItemsQuery): CollectionItemsQuery => {
  const { error, value } = collectionItemsQuerySchema.validate(query);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCollectionItemsQuery;
