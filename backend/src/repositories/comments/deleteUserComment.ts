import { ObjectId } from 'mongodb';
import getCommentsCollection from './getCommentsCollection';

const deleteUserComment = async (commentId: ObjectId, publisherId: ObjectId): Promise<boolean> => {
  const commentsCollection = await getCommentsCollection();
  const result = await commentsCollection.deleteOne({ _id: commentId, publisherId });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default deleteUserComment;
