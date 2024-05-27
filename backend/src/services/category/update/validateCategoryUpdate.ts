import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { CategoryUpdate } from '.';

const categoryUpdateSchema = Joi.object({
  title: Joi.string().trim().min(3).max(32).required(),
});

const validateCategoryUpdate = (update: CategoryUpdate): CategoryUpdate => {
  const { error, value } = categoryUpdateSchema.validate(update);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCategoryUpdate;
