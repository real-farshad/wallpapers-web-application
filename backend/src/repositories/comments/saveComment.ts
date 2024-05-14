import { Comment } from '@src/models/commentModel';
import getCommentsCollection from './getCommentsCollection';

const saveComment = async (comment: Comment) => {
  const commentsCollection = await getCommentsCollection();
  const result = await commentsCollection.insertOne(comment);

  const savedComment = { _id: result.insertedId, ...comment };
  return savedComment;
};

export default saveComment;
