import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { CategoriesQuery } from '.';

const categoriesQuerySchema = Joi.object({
  page: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(0).max(20).optional(),
});

const validateCategoriesQuery = (query: CategoriesQuery): CategoriesQuery => {
  const { error, value } = categoriesQuerySchema.validate(query);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCategoriesQuery;
