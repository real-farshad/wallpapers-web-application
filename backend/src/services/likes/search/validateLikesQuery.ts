import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { LikesQuery } from '.';

const likesQuerySchema = Joi.object({
  page: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(0).max(20).optional(),
});

const validateLikesQuery = (query: LikesQuery): LikesQuery => {
  const { error, value } = likesQuerySchema.validate(query);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateLikesQuery;
