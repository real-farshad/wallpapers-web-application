import deleteUserComment from '@src/repositories/comments/deleteUserComment';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const removeComment = async (commentId: string, userId: ObjectId) => {
  const commentObjectId = new ObjectId(commentId);
  const success = await deleteUserComment(commentObjectId, userId);

  if (!success) {
    const errorStatus = 404;
    const errorMessage = "A comment with this id, published by this user, doesn't eixst!";
    throw new CustomError(errorStatus, errorMessage);
  }

  const result = { success: true };
  return result;
};

export default removeComment;
