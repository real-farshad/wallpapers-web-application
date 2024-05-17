import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateCommentId from './validateCommentId';
import deleteCommentFromDatabase from './deleteCommentFromDatabase';

const deleteComment = async (commentId: string, user: User) => {
  commentId = validateCommentId(commentId);

  const userId = user._id as ObjectId;
  const result = await deleteCommentFromDatabase(commentId, userId);

  return result;
};

export default deleteComment;
