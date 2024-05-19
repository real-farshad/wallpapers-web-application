import { ObjectId } from 'mongodb';
import getCommentsCollection from './getCommentsCollection';
import { Comment } from '@src/models/commentModel';

const findCommentById = async (id: ObjectId): Promise<Comment | undefined> => {
  const commentsCollection = await getCommentsCollection();
  const comment = await commentsCollection.findOne({ _id: id });
  return comment;
};

export default findCommentById;
