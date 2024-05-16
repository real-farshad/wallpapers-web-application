import { CustomError } from '@src/utils/CustomError';
import Joi from 'joi';

const startDate = Joi.string()
  .pattern(/^\d{2}-\d{2}-\d{4}$/)
  .custom((value, helpers) => {
    const date = Date.parse(value);
    if (isNaN(date)) return helpers.error('any.invalid');
    return value;
  }, 'Valid MM-DD-YYYY date');

const endDate = Joi.string()
  .pattern(/^\d{2}-\d{2}-\d{4}$/)
  .custom((value, helpers) => {
    const date = Date.parse(value);
    if (isNaN(date)) return helpers.error('any.invalid');
    return value;
  }, 'Valid MM-DD-YYYY date');

const wallpapersQuerySchema = Joi.object({
  title: Joi.string().trim().min(3).max(64),
  startDate,
  endDate,
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0).max(20),
});

const validateCollectionsQuery = (query: any) => {
  const { error, value } = wallpapersQuerySchema.validate(query);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  let startDate;
  if (value.startDate) startDate = new Date(value.startDate).getTime();

  let endDate;
  if (value.endDate) endDate = new Date(value.endDate).getTime();

  if (startDate && endDate && startDate > endDate) {
    const errorStatus = 400;
    const errorMessage = 'Start date must be before end date!';
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCollectionsQuery;
