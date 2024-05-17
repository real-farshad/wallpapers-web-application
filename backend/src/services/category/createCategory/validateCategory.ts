import Joi from 'joi';
import { CategoryPayload } from '@src/models/categoryModel';
import { CustomError } from '@utils/CustomError';

const categorySchema = Joi.object({
  title: Joi.string().lowercase().trim().min(3).max(32).required(),
});

const validateCategory = (category: CategoryPayload) => {
  const { error, value } = categorySchema.validate(category);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCategory;
