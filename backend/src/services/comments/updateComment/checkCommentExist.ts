import findCommentById from '@src/repositories/comments/findCommentById';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const checkCommentExist = async (commentId: string) => {
  const commentObjectId = new ObjectId(commentId);
  const comment = await findCommentById(commentObjectId);

  if (!comment) {
    const errorStatus = 404;
    const errorMessage = "A comment with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return comment;
};

export default checkCommentExist;
