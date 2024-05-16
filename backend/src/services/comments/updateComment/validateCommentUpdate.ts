import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';

const commentSchema = Joi.object({
  text: Joi.string().trim().min(3).max(256).required(),
});

const validateCommentUpdate = (update: any) => {
  const { error, value } = commentSchema.validate(update);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCommentUpdate;
