import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateCommentId from '../validateCommentId';
import removeComment from './removeComment';

const remove = async (commentId: string, user: User) => {
  commentId = validateCommentId(commentId);

  const userId = user._id as ObjectId;
  const result = await removeComment(commentId, userId);

  return result;
};

export default remove;
