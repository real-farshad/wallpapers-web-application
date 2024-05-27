import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateCommentUpdate from './validateCommentUpdate';
import ensureCommentExists from './ensureCommentExists';
import updateComment from './updateComment';
import validateCommentId from '../validateCommentId';

export interface CommentUpdate {
  text: string;
}

const update = async (commentId: string, update: CommentUpdate, user: User) => {
  commentId = validateCommentId(commentId);

  update = validateCommentUpdate(update);

  const userId = user._id as ObjectId;
  await ensureCommentExists(commentId, userId);

  const updatedComment = await updateComment(commentId, update);
  return updatedComment;
};

export default update;
