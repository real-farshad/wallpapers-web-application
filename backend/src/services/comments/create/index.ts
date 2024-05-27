import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateComment from './validateComment';
import ensureWallpaperExists from '../../common/ensureWallpaperExists';
import modifyComment from './modifyComment';
import insertComment from '@src/repositories/comments/insertComment';

export interface CommentPayload {
  wallpaperId: string;
  text: string;
}

const create = async (comment: CommentPayload, user: User) => {
  comment = validateComment(comment);

  await ensureWallpaperExists(comment.wallpaperId);

  const userId = user._id as ObjectId;
  const newComment = modifyComment(comment, userId);

  const savedComment = await insertComment(newComment);
  return savedComment;
};

export default create;
