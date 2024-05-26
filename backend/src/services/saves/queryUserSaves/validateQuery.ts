import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { SavesQuery } from '.';

const savesQuerySchema = Joi.object({
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0).max(20),
});

const validateQuery = (query: SavesQuery): SavesQuery => {
  const { error, value } = savesQuerySchema.validate(query);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateQuery;
