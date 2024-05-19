import { ObjectId } from 'mongodb';
import getCommentsCollection from './getCommentsCollection';
import { CommentUpdate } from '@src/services/comments/updateComment';

const updateCommentById = async (
  commentId: ObjectId,
  update: CommentUpdate
): Promise<Comment | undefined> => {
  const commentsCollection = await getCommentsCollection();
  const result = await commentsCollection.findOneAndUpdate(
    { _id: commentId },
    { $set: update },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateCommentById;
