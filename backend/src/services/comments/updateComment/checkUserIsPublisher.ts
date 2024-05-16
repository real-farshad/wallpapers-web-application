import { Comment } from '@src/models/commentModel';
import { CustomError } from '@src/utils/CustomError';

const checkUserIsPublisher = (comment: Comment, user: any) => {
  const publisherId = comment.publisherId.toString();
  const userId = user._id.toString();

  const userIsPublisher = publisherId === userId;
  if (!userIsPublisher) {
    const errorStatus = 403;
    const errorMessage = 'Only the publisher of the comment can update it!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkUserIsPublisher;
