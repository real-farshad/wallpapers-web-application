import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';
import { CommentPayload } from '.';

const commentSchema = Joi.object({
  wallpaperId: Joi.string().trim().min(3).max(32).required(),
  text: Joi.string().trim().min(3).max(256).required(),
});

const validateComment = (comment: CommentPayload): CommentPayload => {
  const { error, value } = commentSchema.validate(comment);
  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  const wallpaperId = value.wallpaperId;
  const isValidWallpaperId = ObjectId.isValid(wallpaperId);

  if (!isValidWallpaperId) {
    const errorStatus = 400;
    const errorMessage = 'Invalid wallpaper id!';
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateComment;
