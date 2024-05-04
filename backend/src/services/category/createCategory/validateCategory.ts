import { CustomError } from '@src/utils/CustomError';
import Joi from 'joi';

const categorySchema = Joi.object({
  title: Joi.string().lowercase().trim().min(3).max(32).required(),
});

const validateCategory = (category: any) => {
  const { error, value } = categorySchema.validate(category);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCategory;
