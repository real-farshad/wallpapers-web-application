import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { LikesQuery } from '@src/models/likeModel';

const querySchema = Joi.object({
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0).max(20),
});

const validateQuery = (query: LikesQuery) => {
  const { error, value } = querySchema.validate(query);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateQuery;
