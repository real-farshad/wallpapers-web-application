import Joi from 'joi';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';
import { CommentPayload } from '.';

const commentSchema = Joi.object({
  text: Joi.string().trim().min(3).max(256).required(),
});

const validateComment = (comment: CommentPayload): CommentPayload => {
  const text = comment.text;
  const wallpaperId = comment.wallpaperId;

  const { error, value } = commentSchema.validate({ text });
  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  if (!wallpaperId) {
    const errorStatus = 400;
    const errorMessage = '"wallpaperId" is required!';
    throw new CustomError(errorStatus, errorMessage);
  }

  const isValidWallpaperId = ObjectId.isValid(wallpaperId);
  if (!isValidWallpaperId) {
    const errorStatus = 400;
    const errorMessage = 'Invalid wallpaper id';
    throw new CustomError(errorStatus, errorMessage);
  }

  const validComment = {
    ...value,
    wallpaperId,
  };

  return validComment;
};

export default validateComment;
