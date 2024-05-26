import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { CommentUpdate } from '.';

const commentUpdateSchema = Joi.object({
  text: Joi.string().trim().min(3).max(256).required(),
});

const validateCommentUpdate = (update: CommentUpdate): CommentUpdate => {
  const { error, value } = commentUpdateSchema.validate(update);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateCommentUpdate;
