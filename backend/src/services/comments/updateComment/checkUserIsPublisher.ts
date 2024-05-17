import { Comment } from '@src/models/commentModel';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import { CustomError } from '@src/utils/CustomError';

const checkUserIsPublisher = (comment: Comment, user: User) => {
  const publisherId = comment.publisherId;
  const userId = user._id as ObjectId;

  const userIsPublisher = publisherId.toString() === userId.toString();
  if (!userIsPublisher) {
    const errorStatus = 403;
    const errorMessage = 'Only the publisher of the comment can update it!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkUserIsPublisher;
