import { ObjectId } from 'mongodb';
import getCommentsCollection from './getCommentsCollection';
import { Comment } from '@src/models/commentModel';

const findUserComment = async (
  commentId: ObjectId,
  userId: ObjectId
): Promise<Comment | undefined> => {
  const commentsCollection = await getCommentsCollection();
  const comment = await commentsCollection.findOne({ _id: commentId, publisherId: userId });
  return comment;
};

export default findUserComment;
