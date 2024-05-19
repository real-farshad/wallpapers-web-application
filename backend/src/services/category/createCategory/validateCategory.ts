import Joi from 'joi';
import { CustomError } from '@utils/CustomError';
import { CategoryPayload } from '.';

const categorySchema = Joi.object({
  title: Joi.string().lowercase().trim().min(3).max(32).required(),
});

const validateCategory = (category: CategoryPayload): CategoryPayload => {
  const { error, value } = categorySchema.validate(category);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCategory;
