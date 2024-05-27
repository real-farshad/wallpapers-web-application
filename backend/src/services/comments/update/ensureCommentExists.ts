import findUserComment from '@src/repositories/comments/findUserComment';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const ensureCommentExists = async (commentId: string, userId: ObjectId) => {
  const commentObjectId = new ObjectId(commentId);
  const comment = await findUserComment(commentObjectId, userId);

  if (!comment) {
    const errorStatus = 404;
    const errorMessage = "A comment with this id, by this user, doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return comment;
};

export default ensureCommentExists;
